package com.poshan.service;

import com.poshan.dto.AuthResponse;
import com.poshan.dto.ChangePasswordRequest;
import com.poshan.dto.LoginRequest;
import com.poshan.dto.UpdateProfileRequest;
import com.poshan.dto.UserProfileResponse;

import com.poshan.entity.User;

import com.poshan.repository.UserRepository;

import com.poshan.security.CustomUserDetails;
import com.poshan.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;


    // =========================================================
    // LOGIN
    // =========================================================

    public AuthResponse login(
            LoginRequest request
    ) {

        User user =
                userRepository
                        .findByUsername(
                                request.getUsername()
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );


        /*
         =====================================================
         AUTHENTICATE
         =====================================================
         */

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getUsername(),

                        request.getPassword()

                )

        );


        /*
         =====================================================
         JWT
         =====================================================
         */

        String token =
                jwtService.generateToken(
                        new CustomUserDetails(
                                user
                        )
                );


        /*
         =====================================================
         EMPLOYEE ID
         =====================================================
         */

        Long employeeId = null;


        if (
                user.getEmployee() != null
        ) {

            employeeId =
                    user.getEmployee().getId();

        }


        /*
         =====================================================
         ROLES
         =====================================================
         */

        List<String> roles =
                user.getRoles()
                        .stream()
                        .map(
                                role ->
                                        role.getName()
                        )
                        .toList();


        /*
         =====================================================
         POSITION
         =====================================================
         */

        String position =
                user.getPosition() != null
                        ? user.getPosition().name()
                        : null;


        /*
         =====================================================
         RESPONSE
         =====================================================
         */

        return new AuthResponse(

                token,

                user.getUsername(),

                user.getId(),

                user.getName(),

                employeeId,

                roles,

                position

        );

    }


    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    public void changePassword(
            ChangePasswordRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        String username =
                authentication.getName();


        User user =
                userRepository
                        .findByUsername(
                                username
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );


        if (
                !passwordEncoder.matches(
                        request.getCurrentPassword(),
                        user.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "Current password is incorrect."
            );

        }


        if (
                !request.getNewPassword()
                        .equals(
                                request.getConfirmPassword()
                        )
        ) {

            throw new RuntimeException(
                    "New password and confirm password do not match."
            );

        }


        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );


        userRepository.save(
                user
        );

    }


    // =========================================================
    // GET CURRENT USER
    // =========================================================

    public UserProfileResponse
    getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        String username =
                authentication.getName();


        User user =
                userRepository
                        .findByUsername(
                                username
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );


        return mapUserProfile(
                user
        );

    }


    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    public UserProfileResponse
    updateProfile(
            UpdateProfileRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        String username =
                authentication.getName();


        User user =
                userRepository
                        .findByUsername(
                                username
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );


        user.setName(
                request.getName()
        );


        user.setEmail(
                request.getEmail()
        );


        userRepository.save(
                user
        );


        return mapUserProfile(
                user
        );

    }


    // =========================================================
    // MAP USER PROFILE
    // =========================================================

    private UserProfileResponse
    mapUserProfile(
            User user
    ) {

        List<String> roles =
                user.getRoles()
                        .stream()
                        .map(
                                role ->
                                        role.getName()
                        )
                        .toList();


        String position =
                user.getPosition() != null
                        ? user.getPosition().name()
                        : null;


        return new UserProfileResponse(

                user.getId(),

                user.getName(),

                user.getUsername(),

                user.getEmail(),

                roles,

                position

        );

    }

}
package com.poshan.service;

import com.poshan.dto.CreateUserRequest;
import com.poshan.dto.UserResponseDTO;
import com.poshan.entity.Role;
import com.poshan.entity.User;
import com.poshan.entity.UserPosition;
import com.poshan.repository.RoleRepository;
import com.poshan.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;


    // =========================================================
    // CREATE USER BY ADMIN
    // =========================================================

    public UserResponseDTO createUser(
            CreateUserRequest request
    ) {

        if (
                userRepository.existsByUsername(
                        request.getUsername()
                )
        ) {

            throw new RuntimeException(
                    "Username already exists"
            );

        }


        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            throw new RuntimeException(
                    "Email already exists"
            );

        }


        Set<Role> roles =
                new HashSet<>();


        if (
                request.getRoles() != null
                        &&
                        !request.getRoles().isEmpty()
        ) {

            for (
                    String roleName :
                    request.getRoles()
            ) {

                String normalizedRole =
                        normalizeRoleName(
                                roleName
                        );


                Role role =
                        roleRepository
                                .findByName(
                                        normalizedRole
                                )
                                .orElseGet(
                                        () ->
                                                roleRepository.save(
                                                        Role.builder()
                                                                .name(
                                                                        normalizedRole
                                                                )
                                                                .build()
                                                )
                                );


                roles.add(role);

            }

        } else {

            Role defaultRole =
                    roleRepository
                            .findByName(
                                    "ROLE_EMPLOYEE"
                            )
                            .orElseGet(
                                    () ->
                                            roleRepository.save(
                                                    Role.builder()
                                                            .name(
                                                                    "ROLE_EMPLOYEE"
                                                            )
                                                            .build()
                                            )
                            );


            roles.add(
                    defaultRole
            );

        }


        User user =
                User.builder()
                        .name(
                                request.getName()
                        )
                        .username(
                                request.getUsername()
                        )
                        .email(
                                request.getEmail()
                        )
                        .password(
                                passwordEncoder.encode(
                                        request.getPassword()
                                )
                        )
                        .roles(
                                roles
                        )
                        .build();


        /*
         =====================================================
         POSITION
         =====================================================
         */

        setUserPosition(
                user,
                request.getPosition()
        );


        User savedUser =
                userRepository.save(
                        user
                );


        return mapToDTO(
                savedUser
        );

    }


    // =========================================================
    // GET ALL USERS
    // =========================================================

    public List<UserResponseDTO>
    getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(
                        this::mapToDTO
                )
                .toList();

    }


    // =========================================================
    // GET USER BY ID
    // =========================================================

    public UserResponseDTO
    getUserById(
            Long id
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );


        return mapToDTO(
                user
        );

    }


    // =========================================================
    // UPDATE USER
    // =========================================================

    public UserResponseDTO updateUser(
            Long id,
            CreateUserRequest request
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );


        /*
         =====================================================
         USERNAME
         =====================================================
         */

        if (
                !user.getUsername()
                        .equals(
                                request.getUsername()
                        )
                        &&
                        userRepository.existsByUsername(
                                request.getUsername()
                        )
        ) {

            throw new RuntimeException(
                    "Username already exists"
            );

        }


        /*
         =====================================================
         EMAIL
         =====================================================
         */

        if (
                !user.getEmail()
                        .equals(
                                request.getEmail()
                        )
                        &&
                        userRepository.existsByEmail(
                                request.getEmail()
                        )
        ) {

            throw new RuntimeException(
                    "Email already exists"
            );

        }


        /*
         =====================================================
         BASIC INFORMATION
         =====================================================
         */

        user.setName(
                request.getName()
        );


        user.setUsername(
                request.getUsername()
        );


        user.setEmail(
                request.getEmail()
        );


        /*
         =====================================================
         POSITION
         =====================================================
         */

        setUserPosition(
                user,
                request.getPosition()
        );


        /*
         =====================================================
         PASSWORD
         =====================================================
         */

        if (
                request.getPassword() != null
                        &&
                        !request.getPassword().isBlank()
        ) {

            user.setPassword(
                    passwordEncoder.encode(
                            request.getPassword()
                    )
            );

        }


        /*
         =====================================================
         ROLES
         =====================================================
         */

        if (
                request.getRoles() != null
                        &&
                        !request.getRoles().isEmpty()
        ) {

            Set<Role> roles =
                    new HashSet<>();


            for (
                    String roleName :
                    request.getRoles()
            ) {

                String normalizedRole =
                        normalizeRoleName(
                                roleName
                        );


                Role role =
                        roleRepository
                                .findByName(
                                        normalizedRole
                                )
                                .orElseGet(
                                        () ->
                                                roleRepository.save(
                                                        Role.builder()
                                                                .name(
                                                                        normalizedRole
                                                                )
                                                                .build()
                                                )
                                );


                roles.add(
                        role
                );

            }


            user.setRoles(
                    roles
            );

        }


        User updatedUser =
                userRepository.save(
                        user
                );


        return mapToDTO(
                updatedUser
        );

    }


    // =========================================================
    // DELETE USER
    // =========================================================

    public void deleteUser(
            Long id
    ) {

        if (
                !userRepository.existsById(id)
        ) {

            throw new RuntimeException(
                    "User not found"
            );

        }


        userRepository.deleteById(
                id
        );

    }


    // =========================================================
    // SET USER POSITION
    // =========================================================

    private void setUserPosition(
            User user,
            String position
    ) {

        if (
                position == null
                        ||
                        position.isBlank()
        ) {

            user.setPosition(
                    null
            );

            return;

        }


        try {

            user.setPosition(
                    UserPosition.valueOf(
                            position
                                    .trim()
                                    .toUpperCase()
                    )
            );

        } catch (
                IllegalArgumentException e
        ) {

            throw new RuntimeException(
                    "Invalid position: "
                            + position
            );

        }

    }


    // =========================================================
    // NORMALIZE ROLE
    // =========================================================

    private String normalizeRoleName(
            String roleName
    ) {

        if (
                roleName == null
                        ||
                        roleName.isBlank()
        ) {

            throw new RuntimeException(
                    "Role cannot be empty"
            );

        }


        String normalized =
                roleName
                        .trim()
                        .toUpperCase();


        if (
                !normalized.startsWith(
                        "ROLE_"
                )
        ) {

            normalized =
                    "ROLE_" + normalized;

        }


        return normalized;

    }


    // =========================================================
    // MAP ENTITY -> DTO
    // =========================================================

    private UserResponseDTO mapToDTO(
            User user
    ) {

        UserResponseDTO dto =
                new UserResponseDTO();


        dto.setId(
                user.getId()
        );


        dto.setName(
                user.getName()
        );


        dto.setUsername(
                user.getUsername()
        );


        dto.setEmail(
                user.getEmail()
        );


        Set<String> roles =
                user.getRoles()
                        .stream()
                        .map(
                                Role::getName
                        )
                        .collect(
                                java.util.stream.Collectors.toSet()
                        );


        dto.setRoles(
                roles
        );


        /*
         =====================================================
         POSITION
         =====================================================
         */

        dto.setPosition(
                user.getPosition() != null
                        ? user.getPosition().name()
                        : null
        );


        return dto;

    }

}
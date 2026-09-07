package com.poshan.controller;

import com.poshan.dto.AuthResponse;
import com.poshan.dto.LoginRequest;
import com.poshan.dto.UserProfileResponse;
import com.poshan.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.poshan.dto.ChangePasswordRequest;
import com.poshan.dto.UpdateProfileRequest;
import com.poshan.dto.UserProfileResponse;
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request
    ) {

        authService.changePassword(request);

        return ResponseEntity.ok("Password changed successfully.");

    }
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUser() {

        return ResponseEntity.ok(
                authService.getCurrentUser()
        );

    }
    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @RequestBody UpdateProfileRequest request
    ) {

        return ResponseEntity.ok(
                authService.updateProfile(request)
        );

    }

}
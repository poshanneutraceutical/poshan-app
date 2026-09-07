package com.poshan.controller;

import com.poshan.dto.CreateUserRequest;
import com.poshan.dto.UserResponseDTO;
import com.poshan.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserManagementController {


    private final UserService userService;



    // CREATE EMPLOYEE USER

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDTO> createUser(
            @RequestBody CreateUserRequest request){

        return new ResponseEntity<>(
                userService.createUser(request),
                HttpStatus.CREATED
        );

    }







    // GET ALL USERS

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(){

        return ResponseEntity.ok(
                userService.getAllUsers()
        );

    }







    // GET USER BY ID

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDTO> getUserById(
            @PathVariable Long id){

        return ResponseEntity.ok(
                userService.getUserById(id)
        );

    }








    // UPDATE USER

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable Long id,
            @RequestBody CreateUserRequest request){


        return ResponseEntity.ok(
                userService.updateUser(id, request)
        );

    }







    // DELETE USER

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id){


        userService.deleteUser(id);


        return ResponseEntity.ok(
                "User deleted successfully"
        );

    }

}
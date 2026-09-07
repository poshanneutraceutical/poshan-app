package com.poshan.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class UserController {


    @GetMapping("/user/dashboard")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public String userDashboard() {

        return "User dashboard";
    }


    @GetMapping("/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminDashboard() {

        return "Admin dashboard";
    }
}
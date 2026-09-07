package com.poshan.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private String token;

    private String username;

    private Long userId;

    private String name;

    private Long employeeId;

    private List<String> roles;

    private String position;

}
package com.poshan.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class UserProfileResponse {

    private Long id;

    private String name;

    private String username;

    private String email;

    private List<String> roles;

    private String position;

}
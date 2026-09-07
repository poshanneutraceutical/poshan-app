package com.poshan.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserResponseDTO {

    private Long id;

    private String name;

    private String username;

    private String email;

    private Set<String> roles;

    private String position;

}
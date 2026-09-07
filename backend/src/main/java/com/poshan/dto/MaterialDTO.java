package com.poshan.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MaterialDTO {

    private Long id;

    private String name;

    private Long categoryId;

    private String categoryName;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
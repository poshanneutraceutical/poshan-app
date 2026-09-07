package com.poshan.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InventoryCategoryDTO {

    private Long id;

    private String name;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
package com.poshan.dto;

import com.poshan.entity.BoxType;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InventoryDTO {

    private Long id;

    private Long categoryId;

    private String categoryName;

    private BoxType boxType;

    private Long materialId;

    private String materialName;

    private Integer availableQuantity;

    private Integer minimumQuantity;

    private LocalDateTime updatedAt;
}
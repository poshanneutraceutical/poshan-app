package com.poshan.dto;

import lombok.Data;

@Data
public class InventoryCategorySummaryDTO {

    private Long id;

    private String name;

    private Long totalItems;

    private Long lowStockItems;
}
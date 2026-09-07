package com.poshan.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class InventoryDashboardDTO {

    private Integer availableStock;

    private Integer minimumQuantity;

    private Long lowStockCount;

    private LocalDateTime updatedTime;

    private List<InventoryItemDTO> items;


    @Data
    public static class InventoryItemDTO {

        private Long id;

        private String categoryName;

        private String itemName;

        private Integer availableQuantity;

        private Integer minimumQuantity;

        private Boolean lowStock;

        private LocalDateTime updatedTime;
    }
}
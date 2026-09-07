package com.poshan.dto;

import lombok.Data;

import java.util.List;

@Data
public class SalesDashboardDTO {

    // =========================================================
    // SALES SUMMARY
    // =========================================================

    private Long totalCompanies;

    private Long totalSales;

    private Long totalDeliveries;

    private Long deliveredOrders;

    private Long pendingDeliveries;

    private Long totalReceivingMaterials;


    // =========================================================
    // INVENTORY SUMMARY
    // =========================================================

    /*
     * Total available quantity of BOX category only.
     */
    private Integer totalBoxesAvailable;


    /*
     * Total number of all low-stock inventory records.
     */
    private Long lowStockItems;


    /*
     * Category-wise inventory cards.
     *
     * Example:
     * BOX
     * FLAVOUR
     * SMP
     * DUSTREIN
     * FAT POWDER
     * Custom categories
     */
    private List<InventoryCategoryDTO>
            inventoryCategories;


    /*
     * Combined low-stock inventory.
     */
    private List<InventoryPageDTO>
            lowStockInventory;


    // =========================================================
    // EXISTING DASHBOARD TABLES
    // =========================================================

    private List<DeliveryDTO>
            recentDeliveries;

    private List<ReceivingMaterialDTO>
            recentReceivingMaterials;


    // =========================================================
    // INVENTORY CATEGORY DTO
    // =========================================================

    @Data
    public static class InventoryCategoryDTO {

        private Long categoryId;

        private String categoryName;

        /*
         * Sum of availableQuantity for all items
         * belonging to this category.
         */
        private Integer totalQuantity;

        /*
         * Number of different inventory records.
         */
        private Long totalItems;

        /*
         * Number of low-stock records in this category.
         */
        private Long lowStockItems;

        /*
         * Individual inventory records.
         */
        private List<InventoryItemDTO>
                items;
    }


    // =========================================================
    // INDIVIDUAL INVENTORY ITEM
    // =========================================================

    @Data
    public static class InventoryItemDTO {

        private Long id;

        private String itemName;

        private String categoryName;

        private Integer availableQuantity;

        private Integer minimumQuantity;

        private Boolean lowStock;

        private String boxType;

        private Long materialId;

        private String materialName;
    }
}
package com.poshan.service;

import com.poshan.dto.DeliveryDTO;
import com.poshan.dto.InventoryPageDTO;
import com.poshan.dto.ReceivingMaterialDTO;
import com.poshan.dto.ReceivingMaterialItemDTO;
import com.poshan.dto.SalesDashboardDTO;

import com.poshan.entity.Company;
import com.poshan.entity.Delivery;
import com.poshan.entity.DeliveryStatus;
import com.poshan.entity.Inventory;
import com.poshan.entity.InventoryCategory;
import com.poshan.entity.ReceivingMaterial;
import com.poshan.entity.ReceivingMaterialItem;

import com.poshan.repository.CompanyRepository;
import com.poshan.repository.DeliveryRepository;
import com.poshan.repository.InventoryCategoryRepository;
import com.poshan.repository.InventoryRepository;
import com.poshan.repository.ReceivingMaterialRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesDashboardService {

    private final CompanyRepository companyRepository;

    private final DeliveryRepository deliveryRepository;

    private final InventoryRepository inventoryRepository;

    private final InventoryCategoryRepository
            inventoryCategoryRepository;

    private final ReceivingMaterialRepository
            receivingMaterialRepository;


    // =========================================================
    // SALES DASHBOARD
    // =========================================================

    @Transactional(readOnly = true)
    public SalesDashboardDTO getSalesDashboard() {

        SalesDashboardDTO dto =
                new SalesDashboardDTO();


        // =====================================================
        // SALES SUMMARY
        // =====================================================

        dto.setTotalCompanies(
                companyRepository.count()
        );


        /*
         * Total Sales is currently not connected
         * to a sales/amount entity in the files provided.
         */
        dto.setTotalSales(
                0L
        );


        dto.setTotalDeliveries(
                deliveryRepository.count()
        );


        List<Delivery> allDeliveries =
                deliveryRepository.findAll();


        long deliveredOrders =
                allDeliveries
                        .stream()
                        .filter(
                                delivery ->
                                        delivery.getDeliveryStatus()
                                                == DeliveryStatus.DELIVERED
                        )
                        .count();


        long pendingDeliveries =
                allDeliveries
                        .stream()
                        .filter(
                                delivery ->
                                        delivery.getDeliveryStatus()
                                                != DeliveryStatus.DELIVERED
                        )
                        .count();


        dto.setDeliveredOrders(
                deliveredOrders
        );


        dto.setPendingDeliveries(
                pendingDeliveries
        );


        dto.setTotalReceivingMaterials(
                receivingMaterialRepository.count()
        );


        // =====================================================
        // ALL INVENTORY
        // =====================================================

        List<Inventory> allInventory =
                inventoryRepository.findAll();


        // =====================================================
        // TOTAL BOXES
        // =====================================================

        int totalBoxes =
                allInventory
                        .stream()
                        .filter(
                                inventory ->
                                        isCategory(
                                                inventory,
                                                "BOX"
                                        )
                        )
                        .mapToInt(
                                inventory ->
                                        safeQuantity(
                                                inventory.getAvailableQuantity()
                                        )
                        )
                        .sum();


        dto.setTotalBoxesAvailable(
                totalBoxes
        );


        // =====================================================
        // LOW STOCK COUNT
        // =====================================================

        long lowStockCount =
                allInventory
                        .stream()
                        .filter(
                                this::isLowStock
                        )
                        .count();


        dto.setLowStockItems(
                lowStockCount
        );


        // =====================================================
        // CATEGORY-WISE INVENTORY
        // =====================================================

        List<InventoryCategory>
                categories =
                inventoryCategoryRepository
                        .findAllByActiveTrueOrderByNameAsc();


        List<SalesDashboardDTO.InventoryCategoryDTO>
                inventoryCategories =

                categories
                        .stream()
                        .map(
                                category ->
                                        mapCategory(
                                                category,
                                                allInventory
                                        )
                        )
                        .toList();


        dto.setInventoryCategories(
                inventoryCategories
        );


        // =====================================================
        // LOW STOCK INVENTORY
        // =====================================================

        List<InventoryPageDTO>
                lowStockInventory =

                allInventory
                        .stream()
                        .filter(
                                this::isLowStock
                        )
                        .map(
                                this::mapInventoryToPageDTO
                        )
                        .toList();


        dto.setLowStockInventory(
                lowStockInventory
        );


        // =====================================================
        // RECENT DELIVERIES
        // =====================================================

        List<DeliveryDTO>
                recentDeliveries =

                allDeliveries
                        .stream()
                        .sorted(
                                Comparator.comparing(
                                        Delivery::getCreatedAt,
                                        Comparator.nullsLast(
                                                Comparator.reverseOrder()
                                        )
                                )
                        )
                        .limit(5)
                        .map(
                                this::mapDeliveryToDTO
                        )
                        .toList();


        dto.setRecentDeliveries(
                recentDeliveries
        );


        // =====================================================
        // RECENT RECEIVING MATERIALS
        // =====================================================

        List<ReceivingMaterialDTO>
                recentReceivingMaterials =

                receivingMaterialRepository
                        .findAll()
                        .stream()
                        .sorted(
                                Comparator.comparing(
                                        ReceivingMaterial::getCreatedAt,
                                        Comparator.nullsLast(
                                                Comparator.reverseOrder()
                                        )
                                )
                        )
                        .limit(5)
                        .map(
                                this::mapReceivingMaterialToDTO
                        )
                        .toList();


        dto.setRecentReceivingMaterials(
                recentReceivingMaterials
        );


        return dto;
    }


    // =========================================================
    // CATEGORY MAPPING
    // =========================================================

    private SalesDashboardDTO.InventoryCategoryDTO
    mapCategory(
            InventoryCategory category,
            List<Inventory> allInventory
    ) {

        List<Inventory> categoryItems =
                allInventory
                        .stream()
                        .filter(
                                inventory -> {

                                    InventoryCategory
                                            inventoryCategory =
                                            inventory.getCategory();


                                    /*
                                     * Ignore inventory records
                                     * whose category reference
                                     * is missing/broken.
                                     */

                                    if (
                                            inventoryCategory == null
                                                    ||
                                                    inventoryCategory.getId() == null
                                    ) {

                                        return false;
                                    }


                                    return inventoryCategory
                                            .getId()
                                            .equals(
                                                    category.getId()
                                            );

                                }
                        )
                        .toList();


        SalesDashboardDTO.InventoryCategoryDTO
                dto =
                new SalesDashboardDTO
                        .InventoryCategoryDTO();


        dto.setCategoryId(
                category.getId()
        );


        dto.setCategoryName(
                safeCategoryName(
                        category
                )
        );


        int totalQuantity =
                categoryItems
                        .stream()
                        .mapToInt(
                                inventory ->
                                        safeQuantity(
                                                inventory
                                                        .getAvailableQuantity()
                                        )
                        )
                        .sum();


        dto.setTotalQuantity(
                totalQuantity
        );


        dto.setTotalItems(
                (long) categoryItems.size()
        );


        long lowStockItems =
                categoryItems
                        .stream()
                        .filter(
                                this::isLowStock
                        )
                        .count();


        dto.setLowStockItems(
                lowStockItems
        );


        List<SalesDashboardDTO.InventoryItemDTO>
                items =

                categoryItems
                        .stream()
                        .map(
                                this::mapInventoryItem
                        )
                        .toList();


        dto.setItems(
                items
        );


        return dto;
    }


    // =========================================================
    // INVENTORY ITEM MAPPING
    // =========================================================

    private SalesDashboardDTO.InventoryItemDTO
    mapInventoryItem(
            Inventory inventory
    ) {

        SalesDashboardDTO.InventoryItemDTO
                dto =
                new SalesDashboardDTO
                        .InventoryItemDTO();


        dto.setId(
                inventory.getId()
        );


        dto.setCategoryName(
                safeCategoryName(
                        inventory.getCategory()
                )
        );


        dto.setAvailableQuantity(
                inventory.getAvailableQuantity()
        );


        dto.setMinimumQuantity(
                inventory.getMinimumQuantity()
        );


        dto.setLowStock(
                isLowStock(
                        inventory
                )
        );


        /*
         * BOX
         */

        if (
                inventory.getBoxType()
                        != null
        ) {

            dto.setBoxType(
                    inventory
                            .getBoxType()
                            .name()
            );


            dto.setItemName(
                    inventory
                            .getBoxType()
                            .name()
                            .replace(
                                    "_",
                                    " "
                            )
            );

        }


        /*
         * MATERIAL
         */

        else if (
                inventory.getMaterial()
                        != null
        ) {

            dto.setMaterialId(
                    inventory
                            .getMaterial()
                            .getId()
            );


            dto.setMaterialName(
                    inventory
                            .getMaterial()
                            .getName()
            );


            dto.setItemName(
                    inventory
                            .getMaterial()
                            .getName()
            );

        }


        else {

            dto.setItemName(
                    "-"
            );

        }


        return dto;
    }


    // =========================================================
    // LOW STOCK CHECK
    // =========================================================

    private boolean isLowStock(
            Inventory inventory
    ) {

        if (
                inventory.getAvailableQuantity()
                        == null
                        ||
                        inventory.getMinimumQuantity()
                                == null
        ) {

            return false;
        }


        return inventory
                .getAvailableQuantity()
                <= inventory
                .getMinimumQuantity();

    }


    // =========================================================
    // SAFE QUANTITY
    // =========================================================

    private int safeQuantity(
            Integer value
    ) {

        return value == null
                ? 0
                : value;

    }


    // =========================================================
    // SAFE CATEGORY NAME
    // =========================================================

    private String safeCategoryName(
            InventoryCategory category
    ) {

        if (category == null) {

            return "-";

        }


        try {

            if (category.getName() == null) {

                return "-";

            }


            return category.getName();

        }
        catch (jakarta.persistence.EntityNotFoundException exception) {

            /*
             * The database contains an inventory record
             * referencing a category that no longer exists.
             *
             * Do not crash the dashboard.
             */

            return "-";

        }

    }


    // =========================================================
    // CATEGORY CHECK
    // =========================================================

    private boolean isCategory(
            Inventory inventory,
            String categoryName
    ) {

        if (
                inventory == null ||
                        inventory.getCategory() == null
        ) {

            return false;

        }


        try {

            String currentCategoryName =
                    inventory
                            .getCategory()
                            .getName();


            return currentCategoryName != null
                    &&
                    currentCategoryName.equalsIgnoreCase(
                            categoryName
                    );

        }
        catch (
                jakarta.persistence.EntityNotFoundException exception
        ) {

            /*
             * Broken category reference.
             */

            return false;

        }

    }


    // =========================================================
    // DELIVERY DTO
    // =========================================================

    private DeliveryDTO mapDeliveryToDTO(
            Delivery delivery
    ) {

        DeliveryDTO dto =
                new DeliveryDTO();


        dto.setId(
                delivery.getId()
        );


        if (
                delivery.getCompany()
                        != null
        ) {

            dto.setCompanyId(
                    delivery
                            .getCompany()
                            .getId()
            );


            dto.setCompanyName(
                    delivery
                            .getCompany()
                            .getCompanyname()
            );

        }


        dto.setBoxType(
                delivery.getBoxType()
        );


        dto.setDeliveredQuantity(
                delivery.getDeliveredQuantity()
        );


        dto.setDeliveryStatus(
                delivery.getDeliveryStatus()
        );


        dto.setDeliveryDate(
                delivery.getDeliveryDate()
        );


        dto.setCreatedAt(
                delivery.getCreatedAt()
        );


        dto.setRemarks(
                delivery.getRemarks()
        );


        dto.setDeliveryMedium(
                delivery.getDeliveryMedium()
        );


        return dto;
    }


    // =========================================================
    // RECEIVING MATERIAL DTO
    // =========================================================

    private ReceivingMaterialDTO
    mapReceivingMaterialToDTO(
            ReceivingMaterial material
    ) {

        ReceivingMaterialDTO dto =
                new ReceivingMaterialDTO();


        dto.setId(
                material.getId()
        );


        dto.setReceiverName(
                material.getReceiverName()
        );


        dto.setSupplierName(
                material.getSupplierName()
        );


        dto.setBillNumber(
                material.getBillNumber()
        );


        dto.setMaterialPhotos(
                material.getMaterialPhotos()
        );


        dto.setReceivedDate(
                material.getReceivedDate()
        );


        dto.setCreatedAt(
                material.getCreatedAt()
        );


        dto.setRemarks(
                material.getRemarks()
        );


        if (
                material.getReceivingMaterialItems()
                        != null
        ) {

            List<ReceivingMaterialItemDTO>
                    itemDTOList =

                    material
                            .getReceivingMaterialItems()
                            .stream()
                            .map(
                                    this::mapReceivingMaterialItemToDTO
                            )
                            .toList();


            dto.setReceivingMaterialItems(
                    itemDTOList
            );

        }


        return dto;
    }


    // =========================================================
    // RECEIVING MATERIAL ITEM DTO
    // =========================================================

    private ReceivingMaterialItemDTO
    mapReceivingMaterialItemToDTO(
            ReceivingMaterialItem item
    ) {

        ReceivingMaterialItemDTO dto =
                new ReceivingMaterialItemDTO();


        dto.setId(
                item.getId()
        );


        dto.setBoxType(
                item.getBoxType()
        );


        dto.setMaterialQuantity(
                item.getMaterialQuantity()
        );


        return dto;
    }


    // =========================================================
    // INVENTORY PAGE DTO
    // =========================================================

    private InventoryPageDTO
    mapInventoryToPageDTO(
            Inventory inventory
    ) {

        InventoryPageDTO dto =
                new InventoryPageDTO();


        dto.setId(
                inventory.getId()
        );


        InventoryCategory category =
                inventory.getCategory();


        if (
                category != null
        ) {

            dto.setCategoryId(
                    safeCategoryId(
                            category
                    )
            );


            dto.setCategoryName(
                    safeCategoryName(
                            category
                    )
            );

        }


        dto.setBoxType(
                inventory.getBoxType()
        );


        if (
                inventory.getMaterial()
                        != null
        ) {

            dto.setMaterialId(
                    inventory
                            .getMaterial()
                            .getId()
            );


            dto.setMaterialName(
                    inventory
                            .getMaterial()
                            .getName()
            );

        }


        dto.setAvailableQuantity(
                inventory.getAvailableQuantity()
        );


        dto.setMinimumQuantity(
                inventory.getMinimumQuantity()
        );


        dto.setUpdatedAt(
                inventory.getUpdatedAt()
        );


        dto.setLowStock(
                isLowStock(
                        inventory
                )
        );


        return dto;
    }


    // =========================================================
    // SAFE CATEGORY ID
    // =========================================================

    private Long safeCategoryId(
            InventoryCategory category
    ) {

        try {

            return category.getId();

        }
        catch (
                jakarta.persistence.EntityNotFoundException exception
        ) {

            return null;

        }

    }

}
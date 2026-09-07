package com.poshan.service;

import com.poshan.dto.InventoryCategorySummaryDTO;
import com.poshan.dto.InventoryDTO;
import com.poshan.dto.InventoryPageDTO;

import com.poshan.entity.BoxType;
import com.poshan.entity.Inventory;
import com.poshan.entity.InventoryCategory;
import com.poshan.entity.Material;

import com.poshan.repository.InventoryCategoryRepository;
import com.poshan.repository.InventoryRepository;
import com.poshan.repository.MaterialRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class InventoryService {


    private final InventoryRepository inventoryRepository;

    private final InventoryCategoryRepository categoryRepository;

    private final MaterialRepository materialRepository;

    private final NotificationService notificationService;


    // =========================================================
    // GET ALL INVENTORY
    // =========================================================

    @Transactional(readOnly = true)
    public List<InventoryDTO> getAllInventory() {

        return inventoryRepository
                .findAllByOrderByIdDesc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    // =========================================================
    // GET INVENTORY BY ID
    // =========================================================

    @Transactional(readOnly = true)
    public InventoryPageDTO getInventoryById(
            Long id
    ) {

        Inventory inventory =
                inventoryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory not found"
                                )
                        );


        return mapToPageDTO(
                inventory
        );
    }


    // =========================================================
    // GET INVENTORY BY BOX TYPE
    // =========================================================

    @Transactional(readOnly = true)
    public InventoryDTO getInventoryByBoxType(
            BoxType boxType
    ) {

        Inventory inventory =
                inventoryRepository
                        .findByBoxType(boxType)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Box inventory not found"
                                )
                        );


        return mapToDTO(
                inventory
        );
    }


    // =========================================================
    // GET INVENTORY BY CATEGORY
    // =========================================================

    @Transactional(readOnly = true)
    public List<InventoryDTO> getInventoryByCategory(
            Long categoryId
    ) {

        InventoryCategory category =
                categoryRepository
                        .findById(categoryId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory category not found"
                                )
                        );


        return inventoryRepository
                .findAllByCategoryOrderByIdDesc(
                        category
                )
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    // =========================================================
    // CATEGORY SUMMARY
    // =========================================================

    @Transactional(readOnly = true)
    public List<InventoryCategorySummaryDTO>
    getCategorySummary() {

        List<InventoryCategory> categories =
                categoryRepository
                        .findAllByActiveTrueOrderByNameAsc();


        List<InventoryCategorySummaryDTO>
                result =
                new ArrayList<>();


        for (
                InventoryCategory category
                : categories
        ) {

            long total =
                    inventoryRepository
                            .findAllByCategoryOrderByIdDesc(
                                    category
                            )
                            .size();


            long lowStock =
                    inventoryRepository
                            .countLowStockByCategory(
                                    category
                            );


            InventoryCategorySummaryDTO dto =
                    new InventoryCategorySummaryDTO();


            dto.setId(
                    category.getId()
            );


            dto.setName(
                    category.getName()
            );


            dto.setTotalItems(
                    total
            );


            dto.setLowStockItems(
                    lowStock
            );


            result.add(
                    dto
            );
        }


        return result;
    }


    // =========================================================
    // CREATE INVENTORY
    // =========================================================

    public InventoryDTO createInventory(
            InventoryDTO dto
    ) {

        if (
                dto.getCategoryId() == null
        ) {

            throw new RuntimeException(
                    "Inventory category is required"
            );
        }


        InventoryCategory category =
                categoryRepository
                        .findById(
                                dto.getCategoryId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory category not found"
                                )
                        );


        if (
                dto.getAvailableQuantity() == null ||
                        dto.getAvailableQuantity() < 0
        ) {

            throw new RuntimeException(
                    "Available quantity must be 0 or greater"
            );
        }


        if (
                dto.getMinimumQuantity() == null ||
                        dto.getMinimumQuantity() < 0
        ) {

            throw new RuntimeException(
                    "Minimum quantity must be 0 or greater"
            );
        }


        Inventory inventory =
                new Inventory();


        inventory.setCategory(
                category
        );


        /*
         * =====================================================
         * BOX CATEGORY
         * =====================================================
         */

        if (
                category.getName() != null &&
                        category.getName()
                                .equalsIgnoreCase("BOX")
        ) {

            if (
                    dto.getBoxType() == null
            ) {

                throw new RuntimeException(
                        "Box Type is required"
                );
            }


            if (
                    inventoryRepository
                            .findByCategoryAndBoxType(
                                    category,
                                    dto.getBoxType()
                            )
                            .isPresent()
            ) {

                throw new RuntimeException(
                        "Inventory already exists for this Box Type"
                );
            }


            inventory.setBoxType(
                    dto.getBoxType()
            );


            inventory.setMaterial(
                    null
            );
        }


        /*
         * =====================================================
         * RAW MATERIAL CATEGORIES
         * =====================================================
         */

        else {

            if (
                    dto.getMaterialId() == null
            ) {

                throw new RuntimeException(
                        "Material is required"
                );
            }


            Material material =
                    materialRepository
                            .findById(
                                    dto.getMaterialId()
                            )
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Material not found"
                                    )
                            );


            if (
                    material.getCategory() == null ||
                            !material
                                    .getCategory()
                                    .getId()
                                    .equals(
                                            category.getId()
                                    )
            ) {

                throw new RuntimeException(
                        "Material does not belong to selected category"
                );
            }


            if (
                    inventoryRepository
                            .findByCategoryAndMaterial(
                                    category,
                                    material
                            )
                            .isPresent()
            ) {

                throw new RuntimeException(
                        "Inventory already exists for this material"
                );
            }


            inventory.setMaterial(
                    material
            );


            inventory.setBoxType(
                    null
            );
        }


        inventory.setAvailableQuantity(
                dto.getAvailableQuantity()
        );


        inventory.setMinimumQuantity(
                dto.getMinimumQuantity()
        );


        inventory.setUpdatedAt(
                LocalDateTime.now()
        );


        Inventory saved =
                inventoryRepository.save(
                        inventory
                );


        createLowStockNotificationIfNeeded(
                saved
        );


        return mapToDTO(
                saved
        );
    }


    // =========================================================
    // UPDATE QUANTITY ONLY
    // =========================================================

    public InventoryDTO updateInventory(
            Long id,
            InventoryDTO dto
    ) {

        Inventory inventory =
                inventoryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory not found"
                                )
                        );


        if (
                dto.getAvailableQuantity() == null ||
                        dto.getAvailableQuantity() < 0
        ) {

            throw new RuntimeException(
                    "Available quantity must be 0 or greater"
            );
        }


        if (
                dto.getMinimumQuantity() == null ||
                        dto.getMinimumQuantity() < 0
        ) {

            throw new RuntimeException(
                    "Minimum quantity must be 0 or greater"
            );
        }


        boolean wasLow =
                isLowStock(
                        inventory
                );


        inventory.setAvailableQuantity(
                dto.getAvailableQuantity()
        );


        inventory.setMinimumQuantity(
                dto.getMinimumQuantity()
        );


        inventory.setUpdatedAt(
                LocalDateTime.now()
        );


        Inventory saved =
                inventoryRepository.save(
                        inventory
                );


        boolean nowLow =
                isLowStock(
                        saved
                );


        if (
                !wasLow &&
                        nowLow
        ) {

            notificationService
                    .createLowStockNotification(
                            saved
                    );
        }


        return mapToDTO(
                saved
        );
    }


    // =========================================================
    // DELETE INVENTORY
    // =========================================================

    public void deleteInventory(
            Long id
    ) {

        Inventory inventory =
                inventoryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory not found"
                                )
                        );


        inventoryRepository.delete(
                inventory
        );
    }


    // =========================================================
    // LOW STOCK INVENTORY
    // =========================================================

    @Transactional(readOnly = true)
    public List<InventoryPageDTO>
    getLowStockInventory() {

        return inventoryRepository
                .findAllByOrderByIdDesc()
                .stream()
                .filter(
                        this::isLowStock
                )
                .map(
                        this::mapToPageDTO
                )
                .toList();
    }


    // =========================================================
    // BOX INVENTORY - INCREASE
    // =========================================================

    public void increaseInventory(
            BoxType boxType,
            Integer quantity
    ) {

        validateQuantity(
                quantity
        );


        Inventory inventory =
                inventoryRepository
                        .findByBoxType(
                                boxType
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Box inventory not found"
                                )
                        );


        inventory.setAvailableQuantity(
                safeQuantity(
                        inventory.getAvailableQuantity()
                ) + quantity
        );


        inventory.setUpdatedAt(
                LocalDateTime.now()
        );


        inventoryRepository.save(
                inventory
        );
    }


    // =========================================================
    // BOX INVENTORY - DECREASE
    // =========================================================

    public void decreaseInventory(
            BoxType boxType,
            Integer quantity
    ) {

        validateQuantity(
                quantity
        );


        Inventory inventory =
                inventoryRepository
                        .findByBoxType(
                                boxType
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Box inventory not found"
                                )
                        );


        decreaseInventoryEntity(
                inventory,
                quantity
        );
    }


    // =========================================================
    // MATERIAL INVENTORY - INCREASE BY MATERIAL ID
    // =========================================================

    public void increaseInventoryByMaterial(
            Long materialId,
            Integer quantity
    ) {

        validateQuantity(
                quantity
        );


        Material material =
                materialRepository
                        .findById(
                                materialId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Material not found"
                                )
                        );


        Inventory inventory =
                inventoryRepository
                        .findByMaterial(
                                material
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Material inventory not found"
                                )
                        );


        inventory.setAvailableQuantity(
                safeQuantity(
                        inventory.getAvailableQuantity()
                ) + quantity
        );


        inventory.setUpdatedAt(
                LocalDateTime.now()
        );


        inventoryRepository.save(
                inventory
        );
    }


    // =========================================================
    // MATERIAL INVENTORY - DECREASE BY MATERIAL ID
    // =========================================================

    public void decreaseInventoryByMaterial(
            Long materialId,
            Integer quantity
    ) {

        validateQuantity(
                quantity
        );


        Material material =
                materialRepository
                        .findById(
                                materialId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Material not found"
                                )
                        );


        Inventory inventory =
                inventoryRepository
                        .findByMaterial(
                                material
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Material inventory not found"
                                )
                        );


        decreaseInventoryEntity(
                inventory,
                quantity
        );
    }


    // =========================================================
    // MATERIAL INVENTORY - INCREASE BY CATEGORY + MATERIAL
    // =========================================================

    public void increaseInventoryByMaterial(
            InventoryCategory category,
            Material material,
            Integer quantity
    ) {

        validateQuantity(
                quantity
        );


        if (
                category == null
        ) {

            throw new RuntimeException(
                    "Inventory category is required"
            );
        }


        if (
                material == null
        ) {

            throw new RuntimeException(
                    "Material is required"
            );
        }


        if (
                material.getCategory() == null ||
                        material.getCategory().getId() == null ||
                        !material
                                .getCategory()
                                .getId()
                                .equals(
                                        category.getId()
                                )
        ) {

            throw new RuntimeException(
                    "Material does not belong to selected category"
            );
        }


        Inventory inventory =
                inventoryRepository
                        .findByCategoryAndMaterial(
                                category,
                                material
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Material inventory not found"
                                )
                        );


        inventory.setAvailableQuantity(
                safeQuantity(
                        inventory.getAvailableQuantity()
                ) + quantity
        );


        inventory.setUpdatedAt(
                LocalDateTime.now()
        );


        inventoryRepository.save(
                inventory
        );
    }


    // =========================================================
    // MATERIAL INVENTORY - DECREASE BY CATEGORY + MATERIAL
    // =========================================================

    public void decreaseInventoryByMaterial(
            InventoryCategory category,
            Material material,
            Integer quantity
    ) {

        validateQuantity(
                quantity
        );


        if (
                category == null
        ) {

            throw new RuntimeException(
                    "Inventory category is required"
            );
        }


        if (
                material == null
        ) {

            throw new RuntimeException(
                    "Material is required"
            );
        }


        if (
                material.getCategory() == null ||
                        material.getCategory().getId() == null ||
                        !material
                                .getCategory()
                                .getId()
                                .equals(
                                        category.getId()
                                )
        ) {

            throw new RuntimeException(
                    "Material does not belong to selected category"
            );
        }


        Inventory inventory =
                inventoryRepository
                        .findByCategoryAndMaterial(
                                category,
                                material
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Material inventory not found"
                                )
                        );


        decreaseInventoryEntity(
                inventory,
                quantity
        );
    }


    // =========================================================
    // COMMON INVENTORY DECREASE
    // =========================================================

    private void decreaseInventoryEntity(
            Inventory inventory,
            Integer quantity
    ) {

        if (
                inventory == null
        ) {

            throw new RuntimeException(
                    "Inventory not found"
            );
        }


        int available =
                safeQuantity(
                        inventory.getAvailableQuantity()
                );


        if (
                available < quantity
        ) {

            String itemName =
                    getInventoryDisplayName(
                            inventory
                    );


            throw new RuntimeException(
                    "Not enough inventory available for "
                            + itemName
            );
        }


        boolean wasLow =
                isLowStock(
                        inventory
                );


        inventory.setAvailableQuantity(
                available - quantity
        );


        inventory.setUpdatedAt(
                LocalDateTime.now()
        );


        Inventory saved =
                inventoryRepository.save(
                        inventory
                );


        boolean nowLow =
                isLowStock(
                        saved
                );


        /*
         * Notify only when inventory crosses
         * from normal to low-stock.
         */
        if (
                !wasLow &&
                        nowLow
        ) {

            notificationService
                    .createLowStockNotification(
                            saved
                    );
        }
    }


    // =========================================================
    // COMMON QUANTITY VALIDATION
    // =========================================================

    private void validateQuantity(
            Integer quantity
    ) {

        if (
                quantity == null ||
                        quantity <= 0
        ) {

            throw new RuntimeException(
                    "Quantity must be greater than 0"
            );
        }
    }


    // =========================================================
    // SAFE INTEGER
    // =========================================================

    private int safeQuantity(
            Integer value
    ) {

        return value == null
                ? 0
                : value;
    }


    // =========================================================
    // LOW STOCK CHECK
    // =========================================================

    private boolean isLowStock(
            Inventory inventory
    ) {

        if (
                inventory == null
        ) {

            return false;
        }


        if (
                inventory.getAvailableQuantity()
                        == null ||
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
    // LOW STOCK NOTIFICATION
    // =========================================================

    private void createLowStockNotificationIfNeeded(
            Inventory inventory
    ) {

        if (
                isLowStock(
                        inventory
                )
        ) {

            notificationService
                    .createLowStockNotification(
                            inventory
                    );
        }
    }


    // =========================================================
    // INVENTORY DISPLAY NAME
    // =========================================================

    private String getInventoryDisplayName(
            Inventory inventory
    ) {

        if (
                inventory.getBoxType()
                        != null
        ) {

            return inventory
                    .getBoxType()
                    .name()
                    .replace(
                            "_",
                            " "
                    );
        }


        if (
                inventory.getMaterial()
                        != null
        ) {

            return inventory
                    .getMaterial()
                    .getName();
        }


        if (
                inventory.getCategory()
                        != null
        ) {

            return inventory
                    .getCategory()
                    .getName();
        }


        return "selected inventory";
    }


    // =========================================================
    // MAP ENTITY -> INVENTORY DTO
    // =========================================================

    private InventoryDTO mapToDTO(
            Inventory inventory
    ) {

        InventoryDTO dto =
                new InventoryDTO();


        dto.setId(
                inventory.getId()
        );


        if (
                inventory.getCategory()
                        != null
        ) {

            dto.setCategoryId(
                    inventory
                            .getCategory()
                            .getId()
            );


            dto.setCategoryName(
                    inventory
                            .getCategory()
                            .getName()
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


        return dto;
    }


    // =========================================================
    // MAP ENTITY -> INVENTORY PAGE DTO
    // =========================================================

    private InventoryPageDTO mapToPageDTO(
            Inventory inventory
    ) {

        InventoryPageDTO dto =
                new InventoryPageDTO();


        dto.setId(
                inventory.getId()
        );


        if (
                inventory.getCategory()
                        != null
        ) {

            dto.setCategoryId(
                    inventory
                            .getCategory()
                            .getId()
            );


            dto.setCategoryName(
                    inventory
                            .getCategory()
                            .getName()
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


        dto.setLowStock(
                isLowStock(
                        inventory
                )
        );


        dto.setUpdatedAt(
                inventory.getUpdatedAt()
        );


        return dto;
    }

}
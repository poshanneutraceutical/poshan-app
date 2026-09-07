package com.poshan.service;

import com.poshan.dto.DeliveryCompanySummaryDTO;
import com.poshan.dto.DeliveryDTO;

import com.poshan.entity.BoxType;
import com.poshan.entity.Company;
import com.poshan.entity.Delivery;
import com.poshan.entity.DeliveryStatus;
import com.poshan.entity.InventoryCategory;
import com.poshan.entity.Material;

import com.poshan.repository.CompanyRepository;
import com.poshan.repository.DeliveryRepository;
import com.poshan.repository.InventoryCategoryRepository;
import com.poshan.repository.MaterialRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    private final CompanyRepository companyRepository;

    private final InventoryService inventoryService;

    private final InventoryCategoryRepository
            inventoryCategoryRepository;

    private final MaterialRepository
            materialRepository;


    // =========================================================
    // CREATE SINGLE DELIVERY
    // =========================================================

    public DeliveryDTO createdelivery(
            DeliveryDTO deliveryDTO
    ) {

        validateDeliveryItem(
                deliveryDTO
        );


        Company company =
                companyRepository
                        .findById(
                                deliveryDTO.getCompanyId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Company not found"
                                )
                        );


        Delivery delivery =
                buildDelivery(
                        deliveryDTO,
                        company
                );


        Delivery savedDelivery =
                deliveryRepository.save(
                        delivery
                );


        processInventoryAfterCreate(
                savedDelivery
        );


        return mapToDTO(
                savedDelivery
        );
    }


    // =========================================================
    // CREATE MULTIPLE DELIVERIES
    // =========================================================

    @Transactional
    public List<DeliveryDTO> createdeliveries(
            List<DeliveryDTO> deliveryDTOs
    ) {

        if (
                deliveryDTOs == null ||
                        deliveryDTOs.isEmpty()
        ) {

            throw new RuntimeException(
                    "At least one delivery item is required"
            );
        }


        DeliveryDTO first =
                deliveryDTOs.get(0);


        if (
                first.getCompanyId() == null
        ) {

            throw new RuntimeException(
                    "Company ID is required"
            );
        }


        Company company =
                companyRepository
                        .findById(
                                first.getCompanyId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Company not found"
                                )
                        );


        List<Delivery> deliveries =
                new ArrayList<>();


        for (
                DeliveryDTO deliveryDTO
                : deliveryDTOs
        ) {

            validateDeliveryItem(
                    deliveryDTO
            );


            /*
             * Make sure every item belongs to
             * the same company as the request.
             */
            if (
                    deliveryDTO.getCompanyId() == null ||
                            !deliveryDTO
                                    .getCompanyId()
                                    .equals(
                                            company.getId()
                                    )
            ) {

                throw new RuntimeException(
                        "All delivery items must belong to the same company"
                );
            }


            Delivery delivery =
                    buildDelivery(
                            deliveryDTO,
                            company
                    );


            Delivery saved =
                    deliveryRepository.save(
                            delivery
                    );


            processInventoryAfterCreate(
                    saved
            );


            deliveries.add(
                    saved
            );
        }


        return deliveries
                .stream()
                .map(
                        this::mapToDTO
                )
                .toList();
    }


    // =========================================================
    // BUILD DELIVERY
    // =========================================================

    private Delivery buildDelivery(
            DeliveryDTO deliveryDTO,
            Company company
    ) {

        Delivery delivery =
                new Delivery();


        delivery.setCompany(
                company
        );


        delivery.setProductName(
                normalize(
                        deliveryDTO.getProductName()
                )
        );


        delivery.setCustomBoxType(
                normalize(
                        deliveryDTO.getCustomBoxType()
                )
        );


        delivery.setBoxType(
                deliveryDTO.getBoxType()
        );


        delivery.setDeliveredQuantity(
                deliveryDTO.getDeliveredQuantity()
        );


        delivery.setDeliveryDate(
                deliveryDTO.getDeliveryDate()
        );


        delivery.setDeliveryStatus(
                deliveryDTO.getDeliveryStatus()
        );


        delivery.setDeliveryMedium(
                normalize(
                        deliveryDTO.getDeliveryMedium()
                )
        );


        delivery.setRemarks(
                normalize(
                        deliveryDTO.getRemarks()
                )
        );


        delivery.setCreatedAt(
                LocalDateTime.now()
        );


        /*
         * Attach inventory category.
         */
        if (
                deliveryDTO.getCategoryId()
                        != null
        ) {

            InventoryCategory category =
                    inventoryCategoryRepository
                            .findById(
                                    deliveryDTO
                                            .getCategoryId()
                            )
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Inventory category not found"
                                    )
                            );


            delivery.setCategory(
                    category
            );
        }


        /*
         * Attach inventory material.
         */
        if (
                deliveryDTO.getMaterialId()
                        != null
        ) {

            Material material =
                    materialRepository
                            .findById(
                                    deliveryDTO
                                            .getMaterialId()
                            )
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Inventory material not found"
                                    )
                            );


            delivery.setMaterial(
                    material
            );
        }


        return delivery;
    }


    // =========================================================
    // VALIDATE DELIVERY
    // =========================================================

    private void validateDeliveryItem(
            DeliveryDTO deliveryDTO
    ) {

        if (
                deliveryDTO == null
        ) {

            throw new RuntimeException(
                    "Delivery item is required"
            );
        }


        if (
                deliveryDTO.getCompanyId() == null
        ) {

            throw new RuntimeException(
                    "Company ID is required"
            );
        }


        if (
                deliveryDTO.getProductName() == null ||
                        deliveryDTO
                                .getProductName()
                                .trim()
                                .isEmpty()
        ) {

            throw new RuntimeException(
                    "Product Name is required"
            );
        }


        if (
                deliveryDTO.getDeliveredQuantity()
                        == null ||
                        deliveryDTO.getDeliveredQuantity()
                                <= 0
        ) {

            throw new RuntimeException(
                    "Delivered quantity must be greater than 0"
            );
        }


        boolean hasCategory =
                deliveryDTO.getCategoryId()
                        != null;


        boolean hasMaterial =
                deliveryDTO.getMaterialId()
                        != null;


        boolean hasBoxType =
                deliveryDTO.getBoxType()
                        != null;


        boolean hasCustomBox =
                deliveryDTO.getCustomBoxType()
                        != null
                        &&
                        !deliveryDTO
                                .getCustomBoxType()
                                .trim()
                                .isEmpty();


        /*
         * A delivery must identify an inventory record.
         */
        if (
                !hasCategory
                        &&
                        !hasBoxType
                        &&
                        !hasCustomBox
        ) {

            throw new RuntimeException(
                    "Select inventory type and inventory item"
            );
        }


        /*
         * Material-based inventory needs a material.
         */
        if (
                hasCategory &&
                        !hasMaterial &&
                        !"BOX".equalsIgnoreCase(
                                deliveryDTO
                                        .getCategoryName()
                        )
        ) {

            throw new RuntimeException(
                    "Material is required for this inventory category"
            );
        }
    }


    // =========================================================
    // INVENTORY AFTER CREATE
    // =========================================================

    private void processInventoryAfterCreate(
            Delivery delivery
    ) {

        if (
                delivery.getDeliveryStatus()
                        != DeliveryStatus.DELIVERED
        ) {

            return;
        }


        decreaseInventoryForDelivery(
                delivery
        );
    }


    // =========================================================
    // DECREASE INVENTORY
    // =========================================================

    private void decreaseInventoryForDelivery(
            Delivery delivery
    ) {

        /*
         * BOX inventory.
         */
        if (
                delivery.getBoxType()
                        != null
        ) {

            inventoryService.decreaseInventory(
                    delivery.getBoxType(),
                    delivery.getDeliveredQuantity()
            );

            return;
        }


        /*
         * Material based inventory.
         */
        if (
                delivery.getCategory()
                        != null &&
                        delivery.getMaterial()
                                != null
        ) {

            inventoryService
                    .decreaseInventoryByMaterial(
                            delivery.getCategory(),
                            delivery.getMaterial(),
                            delivery.getDeliveredQuantity()
                    );

            return;
        }


        /*
         * Custom Box Type is not linked to a
         * predefined BoxType inventory record.
         */
        if (
                delivery.getCustomBoxType()
                        != null
        ) {

            return;
        }


        throw new RuntimeException(
                "Unable to determine inventory for delivery"
        );
    }


    // =========================================================
    // RESTORE INVENTORY
    // =========================================================

    private void restoreInventoryForDelivery(
            Delivery delivery
    ) {

        /*
         * BOX
         */
        if (
                delivery.getBoxType()
                        != null
        ) {

            inventoryService.increaseInventory(
                    delivery.getBoxType(),
                    delivery.getDeliveredQuantity()
            );

            return;
        }


        /*
         * Material
         */
        if (
                delivery.getCategory()
                        != null &&
                        delivery.getMaterial()
                                != null
        ) {

            inventoryService
                    .increaseInventoryByMaterial(
                            delivery.getCategory(),
                            delivery.getMaterial(),
                            delivery.getDeliveredQuantity()
                    );

            return;
        }


        /*
         * Custom box has no linked inventory record.
         */
        if (
                delivery.getCustomBoxType()
                        != null
        ) {

            return;
        }
    }


    // =========================================================
    // UPDATE DELIVERY
    // =========================================================

    public DeliveryDTO updatedelivery(
            Long id,
            DeliveryDTO deliveryDTO
    ) {

        validateDeliveryItem(
                deliveryDTO
        );


        Delivery delivery =
                deliveryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Delivery not found with this id"
                                )
                        );


        Company company =
                companyRepository
                        .findById(
                                deliveryDTO
                                        .getCompanyId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Company not found"
                                )
                        );


        /*
         * Store old state before changing entity.
         */
        DeliveryStatus oldStatus =
                delivery.getDeliveryStatus();


        BoxType oldBoxType =
                delivery.getBoxType();


        InventoryCategory oldCategory =
                delivery.getCategory();


        Material oldMaterial =
                delivery.getMaterial();


        String oldCustomBoxType =
                delivery.getCustomBoxType();


        Integer oldQuantity =
                delivery.getDeliveredQuantity();


        /*
         * If the old delivery already consumed inventory,
         * restore it first.
         */
        if (
                oldStatus == DeliveryStatus.DELIVERED
        ) {

            restoreOldInventory(
                    oldBoxType,
                    oldCategory,
                    oldMaterial,
                    oldCustomBoxType,
                    oldQuantity
            );
        }


        /*
         * Replace delivery fields.
         */
        delivery.setCompany(
                company
        );


        delivery.setProductName(
                normalize(
                        deliveryDTO.getProductName()
                )
        );


        delivery.setBoxType(
                deliveryDTO.getBoxType()
        );


        delivery.setCustomBoxType(
                normalize(
                        deliveryDTO.getCustomBoxType()
                )
        );


        delivery.setDeliveredQuantity(
                deliveryDTO.getDeliveredQuantity()
        );


        delivery.setDeliveryDate(
                deliveryDTO.getDeliveryDate()
        );


        delivery.setDeliveryStatus(
                deliveryDTO.getDeliveryStatus()
        );


        delivery.setDeliveryMedium(
                normalize(
                        deliveryDTO.getDeliveryMedium()
                )
        );


        delivery.setRemarks(
                normalize(
                        deliveryDTO.getRemarks()
                )
        );


        /*
         * Category.
         */
        if (
                deliveryDTO.getCategoryId()
                        != null
        ) {

            InventoryCategory category =
                    inventoryCategoryRepository
                            .findById(
                                    deliveryDTO
                                            .getCategoryId()
                            )
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Inventory category not found"
                                    )
                            );


            delivery.setCategory(
                    category
            );

        }
        else {

            delivery.setCategory(
                    null
            );
        }


        /*
         * Material.
         */
        if (
                deliveryDTO.getMaterialId()
                        != null
        ) {

            Material material =
                    materialRepository
                            .findById(
                                    deliveryDTO
                                            .getMaterialId()
                            )
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Inventory material not found"
                                    )
                            );


            delivery.setMaterial(
                    material
            );

        }
        else {

            delivery.setMaterial(
                    null
            );
        }


        Delivery savedDelivery =
                deliveryRepository.save(
                        delivery
                );


        /*
         * Deduct the NEW inventory only if
         * new status is DELIVERED.
         */
        if (
                savedDelivery.getDeliveryStatus()
                        == DeliveryStatus.DELIVERED
        ) {

            decreaseInventoryForDelivery(
                    savedDelivery
            );
        }


        return mapToDTO(
                savedDelivery
        );
    }


    // =========================================================
    // RESTORE OLD INVENTORY
    // =========================================================

    private void restoreOldInventory(
            BoxType oldBoxType,
            InventoryCategory oldCategory,
            Material oldMaterial,
            String oldCustomBoxType,
            Integer oldQuantity
    ) {

        if (
                oldQuantity == null ||
                        oldQuantity <= 0
        ) {

            return;
        }


        /*
         * BOX
         */
        if (
                oldBoxType != null
        ) {

            inventoryService.increaseInventory(
                    oldBoxType,
                    oldQuantity
            );

            return;
        }


        /*
         * MATERIAL
         */
        if (
                oldCategory != null &&
                        oldMaterial != null
        ) {

            inventoryService
                    .increaseInventoryByMaterial(
                            oldCategory,
                            oldMaterial,
                            oldQuantity
                    );

            return;
        }


        /*
         * CUSTOM BOX
         */
        if (
                oldCustomBoxType != null &&
                        !oldCustomBoxType
                                .trim()
                                .isEmpty()
        ) {

            return;
        }
    }


    // =========================================================
    // GET COMPANY DELIVERIES
    // =========================================================

    @Transactional(readOnly = true)
    public List<DeliveryDTO>
    getalldeliverybycompany(
            Long companyId
    ) {

        Company company =
                companyRepository
                        .findById(
                                companyId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Company not found"
                                )
                        );


        return deliveryRepository
                .findByCompanyOrderByCreatedAtDesc(
                        company
                )
                .stream()
                .map(
                        this::mapToDTO
                )
                .toList();
    }


    // =========================================================
    // GET ONE
    // =========================================================

    @Transactional(readOnly = true)
    public DeliveryDTO getdeliverybyid(
            Long id
    ) {

        Delivery delivery =
                deliveryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Delivery not found with this id"
                                )
                        );


        return mapToDTO(
                delivery
        );
    }


    // =========================================================
    // GET ALL
    // =========================================================

    @Transactional(readOnly = true)
    public List<DeliveryDTO>
    getAllDeliveries() {

        return deliveryRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(
                        this::mapToDTO
                )
                .toList();
    }


    // =========================================================
    // COMPANY SUMMARY
    // =========================================================

    @Transactional(readOnly = true)
    public List<DeliveryCompanySummaryDTO>
    getCompanyDeliverySummary() {

        List<Delivery> deliveries =
                deliveryRepository
                        .findAllByOrderByCreatedAtDesc();


        Map<Long, List<Delivery>> grouped =
                new LinkedHashMap<>();


        for (
                Delivery delivery
                : deliveries
        ) {

            Long companyId =
                    delivery
                            .getCompany()
                            .getId();


            grouped
                    .computeIfAbsent(
                            companyId,
                            key -> new ArrayList<>()
                    )
                    .add(
                            delivery
                    );
        }


        List<DeliveryCompanySummaryDTO>
                result =
                new ArrayList<>();


        for (
                Map.Entry<
                        Long,
                        List<Delivery>
                        > entry
                : grouped.entrySet()
        ) {

            Long companyId =
                    entry.getKey();


            List<Delivery>
                    companyDeliveries =
                    entry.getValue();


            companyDeliveries.sort(
                    Comparator.comparing(
                            Delivery::getCreatedAt,
                            Comparator.nullsLast(
                                    Comparator.reverseOrder()
                            )
                    )
            );


            Delivery latest =
                    companyDeliveries.isEmpty()
                            ? null
                            : companyDeliveries.get(0);


            String companyName =
                    latest != null &&
                            latest.getCompany() != null
                            ? latest
                            .getCompany()
                            .getCompanyname()
                            : "";


            LocalDateTime lastDeliveryDate =
                    companyDeliveries
                            .stream()
                            .map(
                                    Delivery::getDeliveryDate
                            )
                            .filter(
                                    value ->
                                            value != null
                            )
                            .max(
                                    Comparator.naturalOrder()
                            )
                            .orElse(null);


            LocalDateTime lastCreatedAt =
                    latest != null
                            ? latest.getCreatedAt()
                            : null;


            result.add(
                    new DeliveryCompanySummaryDTO(
                            companyId,
                            companyName,
                            (long)
                                    companyDeliveries
                                            .size(),
                            lastDeliveryDate,
                            lastCreatedAt
                    )
            );
        }


        return result;
    }


    // =========================================================
    // DELETE
    // =========================================================

    public void deleteDelivery(
            Long id
    ) {

        Delivery delivery =
                deliveryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Delivery not found"
                                )
                        );


        /*
         * Restore inventory when deleting a
         * delivered record.
         */
        if (
                delivery.getDeliveryStatus()
                        == DeliveryStatus.DELIVERED
        ) {

            restoreInventoryForDelivery(
                    delivery
            );
        }


        deliveryRepository.delete(
                delivery
        );
    }


    // =========================================================
    // ENTITY -> DTO
    // =========================================================

    private DeliveryDTO mapToDTO(
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


        dto.setProductName(
                delivery.getProductName()
        );


        dto.setBoxType(
                delivery.getBoxType()
        );


        dto.setCustomBoxType(
                delivery.getCustomBoxType()
        );


        if (
                delivery.getCategory()
                        != null
        ) {

            dto.setCategoryId(
                    delivery
                            .getCategory()
                            .getId()
            );


            dto.setCategoryName(
                    delivery
                            .getCategory()
                            .getName()
            );
        }


        if (
                delivery.getMaterial()
                        != null
        ) {

            dto.setMaterialId(
                    delivery
                            .getMaterial()
                            .getId()
            );


            dto.setMaterialName(
                    delivery
                            .getMaterial()
                            .getName()
            );
        }


        dto.setDeliveredQuantity(
                delivery.getDeliveredQuantity()
        );


        dto.setDeliveryDate(
                delivery.getDeliveryDate()
        );


        dto.setRemarks(
                delivery.getRemarks()
        );


        dto.setDeliveryStatus(
                delivery.getDeliveryStatus()
        );


        dto.setDeliveryMedium(
                delivery.getDeliveryMedium()
        );


        dto.setCreatedAt(
                delivery.getCreatedAt()
        );


        return dto;
    }


    // =========================================================
    // NORMALIZE
    // =========================================================

    private String normalize(
            String value
    ) {

        if (
                value == null ||
                        value.trim().isEmpty()
        ) {

            return null;
        }


        return value.trim();
    }

}
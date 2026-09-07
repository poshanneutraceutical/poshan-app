package com.poshan.dto;

import com.poshan.entity.BoxType;
import com.poshan.entity.DeliveryStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DeliveryDTO {

    private Long id;

    private BoxType boxType;

    private String customBoxType;

    private String productName;

    private Long companyId;

    private String companyName;

    /*
     * Inventory category:
     *
     * BOX
     * FLAVOUR
     * SMP
     * DUSTREIN
     * FAT POWDER
     * custom category
     */
    private Long categoryId;

    private String categoryName;

    /*
     * Used for material-based inventory:
     *
     * Vanilla
     * Mango
     * SMP Premium
     * Dustrein A
     * etc.
     */
    private Long materialId;

    private String materialName;

    private Integer deliveredQuantity;

    private DeliveryStatus deliveryStatus;

    private LocalDateTime deliveryDate;

    private LocalDateTime createdAt;

    private String deliveryMedium;

    private String remarks;
}
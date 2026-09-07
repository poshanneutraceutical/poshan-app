package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "deliveries")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    /*
     * Used when inventory category is BOX.
     */
    @Enumerated(EnumType.STRING)
    private BoxType boxType;


    /*
     * Used for custom box name when required.
     */
    private String customBoxType;


    /*
     * Product / delivery description.
     */
    private String productName;


    /*
     * Inventory category.
     *
     * Examples:
     * BOX
     * FLAVOUR
     * SMP
     * DUSTREIN
     * FAT POWDER
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private InventoryCategory category;


    /*
     * Used for material based inventory.
     *
     * Examples:
     * Vanilla
     * Mango
     * SMP Premium
     * etc.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id")
    private Material material;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;


    private Integer deliveredQuantity;


    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus =
            DeliveryStatus.HOLD;


    private LocalDateTime deliveryDate;

    private LocalDateTime createdAt;

    private String remarks;

    private String deliveryMedium;
}
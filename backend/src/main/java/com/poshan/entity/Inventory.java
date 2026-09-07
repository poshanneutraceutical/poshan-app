package com.poshan.entity;

import jakarta.persistence.*;

import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "category_id",
            nullable = false
    )
    private InventoryCategory category;


    /*
     * Only used for BOX category.
     */
    @Enumerated(EnumType.STRING)
    private BoxType boxType;


    /*
     * Used for FLAVOUR / SMP / DUSTREIN /
     * FAT POWDER / CUSTOM categories.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id")
    private Material material;


    private Integer availableQuantity;

    private Integer minimumQuantity;

    private LocalDateTime updatedAt;
}
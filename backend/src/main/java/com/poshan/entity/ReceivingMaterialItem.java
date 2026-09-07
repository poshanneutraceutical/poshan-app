package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "receiving_material_items")
public class ReceivingMaterialItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "receiving_material_id", nullable = false)
    private ReceivingMaterial receivingMaterial;

    @Enumerated(EnumType.STRING)
    private BoxType boxType;

    private Integer materialQuantity;
}

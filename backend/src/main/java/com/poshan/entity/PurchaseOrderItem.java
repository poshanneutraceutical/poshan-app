package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "purchase_order_items")
public class PurchaseOrderItem {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "purchase_order_id")
    private PurchaseOrder purchaseOrder;


    @Enumerated(EnumType.STRING)
    private BoxType boxType;


    private Integer quantity;

}
package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "purchase_orders")
public class PurchaseOrder {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    // Unique PO Number
    @Column(unique = true, nullable = false)
    private String poNumber;



    // Related Purchase Requisition
    @OneToOne
    @JoinColumn(name = "pr_id")
    private PR pr;



    // Selected Vendor from PR
    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;



    @Enumerated(EnumType.STRING)
    private PurchaseOrderStatus status;




    private Double totalAmount;




    private LocalDateTime createdAt;




    @OneToMany(
            mappedBy = "purchaseOrder",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<PurchaseOrderItem> items = new ArrayList<>();

}
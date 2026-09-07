package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "purchase_requisition_items")
public class PR_Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "pr_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private PR pr;

    @Enumerated(EnumType.STRING)
    private BoxType boxType;


    private Integer quantity;

}
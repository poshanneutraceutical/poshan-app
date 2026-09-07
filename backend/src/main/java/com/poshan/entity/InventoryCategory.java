package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(
        name = "inventory_categories",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_inventory_category_name",
                        columnNames = "name"
                )
        }
)
public class InventoryCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            nullable = false,
            length = 100
    )
    private String name;

    @Column(
            nullable = false
    )
    private Boolean active = true;

    @Column(
            nullable = false
    )
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
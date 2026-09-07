package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(
        name = "materials",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_material_category_name",
                        columnNames = {
                                "category_id",
                                "name"
                        }
                )
        }
)
public class Material {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;


    @Column(
            nullable = false,
            length = 255
    )
    private String name;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "category_id",
            nullable = false
    )
    private InventoryCategory category;


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
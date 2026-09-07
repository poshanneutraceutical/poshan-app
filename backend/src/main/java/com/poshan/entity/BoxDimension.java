package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "box_dimensions",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "box_code")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class BoxDimension {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     ==========================================
     BOX INFORMATION
     ==========================================
     */

    @Column(
            name = "box_code",
            nullable = false,
            unique = true
    )
    private String boxCode;

    @Column(
            name = "box_type",
            nullable = false
    )
    private String boxType;

    @Column(
            name = "box_image"
    )
    private String boxImage;

    /*
     ==========================================
     DIMENSIONS (MM)
     ==========================================
     */

    @Column(nullable = false)
    private Double height;

    @Column(nullable = false)
    private Double width;
    @Column(nullable = false)
    private Double labelHeight;;
    @Column(nullable = false)
    private Double labelWidth;
    @Column(nullable = false)
    private Double necksealHeight;

    @Column(nullable = false)
    private Double necksealWidth;


    @Column(nullable = false)
    private Double circumference;

    @Column(name = "cap_height")
    private Double capHeight;

    @Column(name = "cap_circumference")
    private Double capCircumference;

    /*
     ==========================================
     DESCRIPTION
     ==========================================
     */

    @Column(length = 1000)
    private String description;

    /*
     ==========================================
     AUDIT
     ==========================================
     */

    @Column(
            name = "created_at",
            updatable = false
    )
    private LocalDateTime createdAt;

    @Column(
            name = "updated_at"
    )
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

        updatedAt = LocalDateTime.now();

    }

    @PreUpdate
    public void preUpdate() {

        updatedAt = LocalDateTime.now();

    }

}
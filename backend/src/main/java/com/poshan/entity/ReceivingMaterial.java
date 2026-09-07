package com.poshan.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "received_material")
public class ReceivingMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String receiverName;

    private String supplierName;

    private String billNumber;

    @ElementCollection
    @CollectionTable(
            name = "receiving_material_photos",
            joinColumns = @JoinColumn(name = "receiving_material_id")
    )
    @Column(name = "photo_path")
    private List<String> materialPhotos = new ArrayList<>();

    private LocalDateTime receivedDate;

    private LocalDateTime createdAt;

    private String remarks;

    @OneToMany(
            mappedBy = "receivingMaterial",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ReceivingMaterialItem> receivingMaterialItems = new ArrayList<>();

}
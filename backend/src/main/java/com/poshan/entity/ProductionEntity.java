package com.poshan.entity;

import jakarta.persistence.*;

import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "productionplan")
@Data
public class ProductionEntity {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    private String plandate;

    private String tittle;

    private String description;

    private String assignby;

    private LocalDateTime executedate;


    @Enumerated(EnumType.STRING)
    private Taskstatus status =
            Taskstatus.IN_PROGRESS;


    private String scoope;


    /*
     * Existing Box Type field.
     */
    private String boxtype;


    /*
     * Raw material reference.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id")
    private Material material;


    private String weight;

    private String neckseal;

    private String companyname;

    private String necksealtype;
}
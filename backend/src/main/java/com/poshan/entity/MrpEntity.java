package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "mrpDetails")
@Data
public class MrpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String  mrp;

    private String batchNumber;

    private String mfgDate;

    private String expDate;

    private String companyName;

    private String scopeType;

    private String boxType;

    private String neckSealType;

    private String note;



}

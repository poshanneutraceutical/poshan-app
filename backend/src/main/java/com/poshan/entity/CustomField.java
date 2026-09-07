package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="custom_field")
public class CustomField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name="company_id", nullable = false)
    private Company company;


    private String fieldName;

    private String fieldValue;
}
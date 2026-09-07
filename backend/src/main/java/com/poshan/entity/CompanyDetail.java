package com.poshan.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "company_details")
public class CompanyDetail {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String ordername;

    private String ordertype;

    private Integer quantity;

    private String companylocation;


    @OneToOne
    @JoinColumn(
            name = "company_id",
            nullable = false
    )
    private Company company;

}
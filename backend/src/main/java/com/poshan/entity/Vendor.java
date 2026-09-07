package com.poshan.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "vendors")
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vendorName;

    private String contactNumber;

    private String vendorEmail;

    private String whatsappNumber;

    private String category;

    private String address;

    private String vendorCompanyName;

    private LocalDateTime createdAt;


}

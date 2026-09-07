package com.poshan.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VendorPageDTO {

    private Long id;

    private String vendorName;

    private String vendorCompanyName;

    private String contactNumber;

    private String vendorEmail;

    private String whatsappNumber;

    private String category;

    private String address;

    private LocalDateTime createdAt;

    private Long totalPurchaseRequisitions;

    private Long pendingPurchaseRequisitions;

    private Long approvedPurchaseRequisitions;

    private LocalDateTime lastPurchaseRequisitionDate;

}
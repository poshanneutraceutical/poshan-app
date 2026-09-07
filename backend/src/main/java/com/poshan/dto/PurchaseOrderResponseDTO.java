package com.poshan.dto;

import com.poshan.entity.PurchaseOrderStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PurchaseOrderResponseDTO {


    private Long id;


    // Purchase Order Number
    private String poNumber;


    // PR reference
    private Long prId;

    private String prNumber;


    // Vendor details

    private Long vendorId;

    private String vendorName;

    private String vendorWhatsappNumber;



    // PO Status

    private PurchaseOrderStatus status;



    // Amount details

    private Double totalAmount;



    // Created date

    private LocalDateTime createdAt;



    // PO items

    private List<PurchaseOrderItemDTO> items;



    // Message for frontend

    private String message;

}
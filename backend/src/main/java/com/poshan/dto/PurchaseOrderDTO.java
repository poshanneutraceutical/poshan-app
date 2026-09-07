package com.poshan.dto;

import com.poshan.entity.PurchaseOrderStatus;
import lombok.Data;

import java.util.List;

@Data
public class PurchaseOrderDTO {


    private Long id;


    // Related PR ID
    private Long prId;


    // Selected vendor ID
    private Long vendorId;


    // PO Number
    private String poNumber;


    // Purchase Order status
    private PurchaseOrderStatus status;


    // Total amount of PO
    private Double totalAmount;


    // Items inside PO
    private List<PurchaseOrderItemDTO> items;

}
package com.poshan.dto;

import com.poshan.entity.PRstatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PR_PageDTO {

    private Long id;

    private String prNumber;


    // Vendor Details
    private Long vendorId;

    private String vendorName;

    private String vendorCompanyName;

    private String vendorContactNumber;


    private String requestedBy;

    private String department;

    private String priority;

    private String remarks;


    private PRstatus status;


    private LocalDateTime createdAt;


    // PR Items
    private List<PR_ItemDTO> items;


    // Approval Details (future use)
    private String approvedBy;

    private LocalDateTime approvedDate;

    private String approvalRemarks;

}
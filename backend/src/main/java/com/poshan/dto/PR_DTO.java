package com.poshan.dto;

import com.poshan.entity.PRstatus;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PR_DTO {

    private Long id;

    private String prNumber;


    // Vendor selected while creating PR
    private Long vendorId;


    private String requestedBy;

    private String department;


    private String priority;


    private String remarks;


    private PRstatus status;


    private LocalDateTime createdAt;


    // Multiple items in one PR
    private List<PR_ItemDTO> items;

}
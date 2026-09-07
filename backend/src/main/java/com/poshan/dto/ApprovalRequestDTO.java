package com.poshan.dto;


import lombok.Data;

@Data
public class ApprovalRequestDTO {

    private String approvedBy;

    private String rejectionReason;

    private String  remarks;

}

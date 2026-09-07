package com.poshan.dto;

import com.poshan.entity.PRstatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApprovalResponseDTO {

    private Long prId;

    private String prNumber;

    private PRstatus status;

    private String approvedBy;

    private LocalDateTime approvedAt;

    private String rejectionReason;

    private String message;
}
package com.poshan.controller;

import com.poshan.dto.ApprovalRequestDTO;
import com.poshan.dto.ApprovalResponseDTO;
import com.poshan.entity.PR;
import com.poshan.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/approval")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ApprovalController {

    private final ApprovalService approvalService;

    @PostMapping("/pr/{id}/approve")
    public ApprovalResponseDTO approvePR(
            @PathVariable Long id,
            @RequestBody ApprovalRequestDTO request
    ){

        return approvalService.approvePR(id, request);

    }

    @PostMapping("/pr/{id}/reject")
    public ApprovalResponseDTO rejectPR(
            @PathVariable Long id,
            @RequestBody ApprovalRequestDTO request
    ) {

        return approvalService.rejectPR(id, request);

    }

    @GetMapping("/pr/pending")
    public List<PR> pendingPRs() {

        return approvalService.getPendingPRs();

    }

    @GetMapping("/pr/approved")
    public List<PR> approvedPRs() {

        return approvalService.getApprovedPRs();

    }

    @GetMapping("/pr/rejected")
    public List<PR> rejectedPRs() {
        return approvalService.getRejectedPRs();

    }

}
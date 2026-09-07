package com.poshan.service;

import com.poshan.dto.ApprovalRequestDTO;
import com.poshan.dto.ApprovalResponseDTO;
import com.poshan.entity.PR;
import com.poshan.entity.PRstatus;
import com.poshan.entity.PurchaseOrder;
import com.poshan.repository.PRRepository;
import com.poshan.repository.PurchaseOrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApprovalService {

    private final PRRepository prRepository;

    private final PurchaseOrderRepository purchaseOrderRepository;

    private final PurchaseOrderService purchaseOrderService;

    private final EmailService emailService;



    /*
     ===========================================================
     APPROVE PURCHASE REQUISITION
     ===========================================================
    */

    @Transactional
    public ApprovalResponseDTO approvePR(
            Long id,
            ApprovalRequestDTO request
    ) {

        PR pr = prRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Purchase Requisition not found"
                        )
                );



        if (pr.getStatus() != PRstatus.Pending) {

            throw new RuntimeException(
                    "Only Pending Purchase Requisition can be approved."
            );

        }



        /*
            Prevent Duplicate Purchase Order
        */

        if (purchaseOrderRepository.existsByPr(pr)) {

            throw new RuntimeException(
                    "Purchase Order already exists for this Purchase Requisition."
            );

        }



        /*
            Update Approval Details
        */

        pr.setStatus(
                PRstatus.Approved
        );

        pr.setApprovedBy(
                request != null
                        ? request.getApprovedBy()
                        : "System"
        );

        pr.setApprovedAt(
                LocalDateTime.now()
        );

        pr.setRejectionReason(
                null
        );



        PR savedPR =
                prRepository.save(pr);



        /*
            Automatically Create Purchase Order
        */

        PurchaseOrder purchaseOrder =
                purchaseOrderService
                        .createPurchaseOrderEntity(
                                savedPR
                        );



        /*
            Automatically Send Email To Vendor

            Email failure should not rollback
            Approval & Purchase Order creation.
        */

        try {

            emailService.sendPurchaseOrderToVendor(
                    purchaseOrder
            );

            log.info(
                    "Purchase Order {} sent successfully to vendor {}",
                    purchaseOrder.getPoNumber(),
                    purchaseOrder.getVendor().getVendorEmail()
            );

        }
        catch (Exception ex) {

            log.error(
                    "Purchase Order created successfully but Email sending failed.",
                    ex
            );

        }



        return mapToResponse(

                savedPR,

                "Purchase Requisition approved successfully. Purchase Order has been created automatically and email process completed."

        );

    }



    /*
     ===========================================================
     REJECT PURCHASE REQUISITION
     ===========================================================
    */

    @Transactional
    public ApprovalResponseDTO rejectPR(
            Long id,
            ApprovalRequestDTO request
    ) {

        PR pr = prRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Purchase Requisition not found"
                        )
                );



        if (pr.getStatus() != PRstatus.Pending) {

            throw new RuntimeException(
                    "Only Pending Purchase Requisition can be rejected."
            );

        }



        pr.setStatus(
                PRstatus.Rejected
        );

        pr.setApprovedBy(
                request != null
                        ? request.getApprovedBy()
                        : "System"
        );

        pr.setApprovedAt(
                LocalDateTime.now()
        );

        pr.setRejectionReason(
                request != null
                        ? request.getRejectionReason()
                        : null
        );



        PR savedPR =
                prRepository.save(pr);



        log.info(
                "Purchase Requisition {} rejected by {}",
                savedPR.getPrNumber(),
                savedPR.getApprovedBy()
        );



        return mapToResponse(

                savedPR,

                "Purchase Requisition rejected successfully."

        );

    }




    /*
     ===========================================================
     GET PENDING PURCHASE REQUISITIONS
     ===========================================================
    */

    public List<PR> getPendingPRs() {

        return prRepository.findByStatus(
                PRstatus.Pending
        );

    }




    /*
     ===========================================================
     GET APPROVED PURCHASE REQUISITIONS
     ===========================================================
    */

    public List<PR> getApprovedPRs() {

        return prRepository.findByStatus(
                PRstatus.Approved
        );

    }




    /*
     ===========================================================
     GET REJECTED PURCHASE REQUISITIONS
     ===========================================================
    */

    public List<PR> getRejectedPRs() {

        return prRepository.findByStatus(
                PRstatus.Rejected
        );

    }




    /*
     ===========================================================
     MAP ENTITY TO RESPONSE DTO
     ===========================================================
    */

    private ApprovalResponseDTO mapToResponse(
            PR pr,
            String message
    ) {

        ApprovalResponseDTO dto =
                new ApprovalResponseDTO();

        dto.setPrId(
                pr.getId()
        );

        dto.setStatus(
                pr.getStatus()
        );

        dto.setApprovedBy(
                pr.getApprovedBy()
        );

        dto.setApprovedAt(
                pr.getApprovedAt()
        );

        dto.setRejectionReason(
                pr.getRejectionReason()
        );

        dto.setMessage(
                message
        );

        return dto;

    }

}
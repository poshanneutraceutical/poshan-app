package com.poshan.controller;

import com.poshan.dto.DeliveryCompanySummaryDTO;
import com.poshan.dto.DeliveryDTO;
import com.poshan.service.DeliveryService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales/delivery")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DeliveryController {

    private final DeliveryService deliveryService;


    // =========================================================
    // CREATE SINGLE DELIVERY
    // =========================================================

    @PostMapping
    public ResponseEntity<DeliveryDTO> createDelivery(
            @RequestBody DeliveryDTO deliveryDTO
    ) {

        return ResponseEntity.ok(
                deliveryService.createdelivery(
                        deliveryDTO
                )
        );
    }


    // =========================================================
    // CREATE MULTIPLE DELIVERIES
    // ONE FORM -> MULTIPLE DATABASE RECORDS
    // =========================================================

    @PostMapping("/bulk")
    public ResponseEntity<List<DeliveryDTO>>
    createDeliveries(
            @RequestBody List<DeliveryDTO> deliveryDTOs
    ) {

        return ResponseEntity.ok(
                deliveryService.createdeliveries(
                        deliveryDTOs
                )
        );
    }


    // =========================================================
    // UPDATE DELIVERY
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryDTO> updateDelivery(
            @PathVariable Long id,
            @RequestBody DeliveryDTO deliveryDTO
    ) {

        return ResponseEntity.ok(
                deliveryService.updatedelivery(
                        id,
                        deliveryDTO
                )
        );
    }


    // =========================================================
    // COMPANY SUMMARY
    // =========================================================

    @GetMapping("/company-summary")
    public ResponseEntity<
            List<DeliveryCompanySummaryDTO>
            > getCompanyDeliverySummary() {

        return ResponseEntity.ok(
                deliveryService
                        .getCompanyDeliverySummary()
        );
    }


    // =========================================================
    // GET ALL DELIVERIES OF COMPANY
    // =========================================================

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<DeliveryDTO>>
    getAllDeliveryByCompany(
            @PathVariable Long companyId
    ) {

        return ResponseEntity.ok(
                deliveryService
                        .getalldeliverybycompany(
                                companyId
                        )
        );
    }


    // =========================================================
    // GET ALL DELIVERIES
    // =========================================================

    @GetMapping
    public ResponseEntity<List<DeliveryDTO>>
    getAllDeliveries() {

        return ResponseEntity.ok(
                deliveryService.getAllDeliveries()
        );
    }


    // =========================================================
    // GET DELIVERY BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryDTO>
    getDeliveryById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                deliveryService.getdeliverybyid(id)
        );
    }


    // =========================================================
    // DELETE DELIVERY
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDelivery(
            @PathVariable Long id
    ) {

        deliveryService.deleteDelivery(id);

        return ResponseEntity.noContent().build();
    }

}
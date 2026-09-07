package com.poshan.controller;

import com.poshan.dto.PurchaseOrderDTO;
import com.poshan.dto.PurchaseOrderStatusUpdateDTO;
import com.poshan.entity.PR;
import com.poshan.entity.PurchaseOrder;
import com.poshan.repository.PRRepository;
import com.poshan.service.EmailService;
import com.poshan.service.PurchaseOrderPdfService;
import com.poshan.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/procurement/purchase-orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    private final PurchaseOrderPdfService purchaseOrderPdfService;

    private final PRRepository prRepository;

    private final EmailService emailService;



    /*
     ===========================================================
     CREATE PURCHASE ORDER FROM PURCHASE REQUISITION
     POST :
     /api/procurement/purchase-orders/create/{prId}
     ===========================================================
    */

    @PostMapping("/create/{prId}")
    public PurchaseOrderDTO createPurchaseOrder(
            @PathVariable Long prId
    ) {

        PR pr = prRepository.findById(prId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Purchase Requisition not found"
                        )
                );

        return purchaseOrderService.createPurchaseOrder(pr);

    }



    /*
     ===========================================================
     GET ALL PURCHASE ORDERS
     GET :
     /api/procurement/purchase-orders
     ===========================================================
    */

    @GetMapping
    public List<PurchaseOrderDTO> getAllPurchaseOrders() {

        return purchaseOrderService.getAllPurchaseOrders();

    }



    /*
     ===========================================================
     GET PURCHASE ORDER BY ID
     GET :
     /api/procurement/purchase-orders/{id}
     ===========================================================
    */

    @GetMapping("/{id}")
    public PurchaseOrderDTO getPurchaseOrderById(
            @PathVariable Long id
    ) {

        return purchaseOrderService.getPurchaseOrderDetails(id);

    }



    /*
     ===========================================================
     GET PURCHASE ORDER DETAILS
     GET :
     /api/procurement/purchase-orders/{id}/details
     ===========================================================
    */

    @GetMapping("/{id}/details")
    public PurchaseOrderDTO getPurchaseOrderDetails(
            @PathVariable Long id
    ) {

        return purchaseOrderService.getPurchaseOrderDetails(id);

    }



    /*
     ===========================================================
     DOWNLOAD PURCHASE ORDER PDF
     GET :
     /api/procurement/purchase-orders/{id}/pdf
     ===========================================================
    */

    @GetMapping("/{id}/pdf")
    public ResponseEntity<Resource> downloadPurchaseOrderPdf(
            @PathVariable Long id
    ) throws IOException {

        PurchaseOrder purchaseOrder =
                purchaseOrderService.getPurchaseOrderEntityById(id);

        String pdfPath =
                purchaseOrderPdfService.generatePurchaseOrderPdf(
                        purchaseOrder
                );

        File file = new File(pdfPath);

        Resource resource =
                new UrlResource(file.toURI());

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" +
                                file.getName() +
                                "\""
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);

    }



    /*
     ===========================================================
     VIEW PURCHASE ORDER PDF
     GET :
     /api/procurement/purchase-orders/{id}/view-pdf
     ===========================================================
    */

    @GetMapping("/{id}/view-pdf")
    public ResponseEntity<Resource> viewPurchaseOrderPdf(
            @PathVariable Long id
    ) throws IOException {

        PurchaseOrder purchaseOrder =
                purchaseOrderService.getPurchaseOrderEntityById(id);

        String pdfPath =
                purchaseOrderPdfService.generatePurchaseOrderPdf(
                        purchaseOrder
                );

        File file = new File(pdfPath);

        Resource resource =
                new UrlResource(file.toURI());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);

    }



    /*
     ===========================================================
     SEND PURCHASE ORDER TO VENDOR
     POST :
     /api/procurement/purchase-orders/{id}/send
     ===========================================================
    */

    @PostMapping("/{id}/send")
    public String sendPurchaseOrderToVendor(
            @PathVariable Long id
    ) {

        PurchaseOrder purchaseOrder =
                purchaseOrderService.getPurchaseOrderEntityById(id);

        emailService.sendPurchaseOrderToVendor(
                purchaseOrder
        );

        return "Purchase Order sent to vendor successfully.";

    }



    /*
     ===========================================================
     UPDATE PURCHASE ORDER STATUS
     PUT :
     /api/procurement/purchase-orders/{id}/status
     ===========================================================
    */

    @PutMapping("/{id}/status")
    public PurchaseOrderDTO updateStatus(
            @PathVariable Long id,
            @RequestBody PurchaseOrderStatusUpdateDTO statusDTO
    ) {

        return purchaseOrderService.updateStatus(
                id,
                statusDTO.getStatus()
        );

    }



    /*
     ===========================================================
     CANCEL PURCHASE ORDER
     DELETE :
     /api/procurement/purchase-orders/{id}
     ===========================================================
    */

    @DeleteMapping("/{id}")
    public String cancelPurchaseOrder(
            @PathVariable Long id
    ) {

        purchaseOrderService.cancelPurchaseOrder(id);

        return "Purchase Order cancelled successfully.";

    }

}
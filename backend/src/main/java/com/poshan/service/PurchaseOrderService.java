package com.poshan.service;


import com.poshan.dto.PurchaseOrderDTO;
import com.poshan.dto.PurchaseOrderItemDTO;

import com.poshan.entity.*;
import com.poshan.repository.PurchaseOrderRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class PurchaseOrderService {


    private final PurchaseOrderRepository purchaseOrderRepository;




    /*
        Create Purchase Order from Approved PR
    */

    public PurchaseOrderDTO createPurchaseOrder(PR pr) {


        if (pr.getStatus() != PRstatus.Approved) {

            throw new RuntimeException(
                    "Only approved PR can create Purchase Order"
            );
        }



        PurchaseOrder po = new PurchaseOrder();



        po.setPoNumber(
                generatePONumber()
        );



        po.setPr(pr);



        po.setVendor(
                pr.getVendor()
        );



        po.setStatus(
                PurchaseOrderStatus.CREATED
        );



        po.setCreatedAt(
                LocalDateTime.now()
        );



        List<PurchaseOrderItem> poItems =
                new ArrayList<>();



        for (PR_Item prItem : pr.getItems()) {


            PurchaseOrderItem item =
                    new PurchaseOrderItem();


            item.setPurchaseOrder(po);


            item.setBoxType(
                    prItem.getBoxType()
            );


            item.setQuantity(
                    prItem.getQuantity()
            );


            poItems.add(item);

        }



        po.setItems(poItems);



        PurchaseOrder savedPO =
                purchaseOrderRepository.save(po);



        return convertToDTO(savedPO);

    }

    /*
        Create Purchase Order Entity from Approved PR
        Used internally by ApprovalService
    */
    public PurchaseOrder createPurchaseOrderEntity(PR pr) {


        if (pr.getStatus() != PRstatus.Approved) {

            throw new RuntimeException(
                    "Only approved PR can create Purchase Order"
            );
        }


        PurchaseOrder po = new PurchaseOrder();


        po.setPoNumber(
                generatePONumber()
        );


        po.setPr(pr);


        po.setVendor(
                pr.getVendor()
        );


        po.setStatus(
                PurchaseOrderStatus.CREATED
        );


        po.setCreatedAt(
                LocalDateTime.now()
        );


        List<PurchaseOrderItem> poItems =
                new ArrayList<>();


        for (PR_Item prItem : pr.getItems()) {


            PurchaseOrderItem item =
                    new PurchaseOrderItem();


            item.setPurchaseOrder(po);


            item.setBoxType(
                    prItem.getBoxType()
            );


            item.setQuantity(
                    prItem.getQuantity()
            );


            poItems.add(item);

        }


        po.setItems(poItems);


        return purchaseOrderRepository.save(po);

    }






    /*
        Generate PO Number
    */

    private String generatePONumber() {


        long count =
                purchaseOrderRepository.count() + 1;


        return "PO-" +
                String.format("%04d", count);

    }







    /*
        Get All Purchase Orders
    */

    public List<PurchaseOrderDTO> getAllPurchaseOrders() {


        return purchaseOrderRepository
                .findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();

    }








    /*
        Get Purchase Order Details
    */

    public PurchaseOrderDTO getPurchaseOrderDetails(Long id) {


        PurchaseOrder po =
                getPurchaseOrderById(id);


        return convertToDTO(po);

    }







    /*
        Find PO By ID
    */

    private PurchaseOrder getPurchaseOrderById(Long id) {


        return purchaseOrderRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Purchase Order not found"
                        )
                );

    }







    /*
        Update Purchase Order Status
    */

    public PurchaseOrderDTO updateStatus(
            Long id,
            PurchaseOrderStatus status
    ){


        PurchaseOrder po =
                getPurchaseOrderById(id);



        po.setStatus(status);



        PurchaseOrder updated =
                purchaseOrderRepository.save(po);



        return convertToDTO(updated);

    }
    public PurchaseOrder getPurchaseOrderEntityById(Long id){

        return purchaseOrderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Purchase Order not found"
                        )
                );
    }







    /*
        Cancel Purchase Order
    */

    public void cancelPurchaseOrder(Long id){


        PurchaseOrder po =
                getPurchaseOrderById(id);



        po.setStatus(
                PurchaseOrderStatus.CANCLED
        );


        purchaseOrderRepository.save(po);

    }








    /*
        Convert Entity To DTO
    */

    private PurchaseOrderDTO convertToDTO(
            PurchaseOrder po
    ){


        PurchaseOrderDTO dto =
                new PurchaseOrderDTO();



        dto.setId(
                po.getId()
        );



        dto.setPoNumber(
                po.getPoNumber()
        );



        dto.setStatus(
                po.getStatus()
        );



        dto.setPrId(
                po.getPr()
                        .getId()
        );



        dto.setVendorId(
                po.getVendor()
                        .getId()
        );



        List<PurchaseOrderItemDTO> items =
                po.getItems()
                        .stream()
                        .map(item -> {


                            PurchaseOrderItemDTO itemDTO =
                                    new PurchaseOrderItemDTO();



                            itemDTO.setId(
                                    item.getId()
                            );


                            itemDTO.setBoxType(
                                    item.getBoxType()
                            );


                            itemDTO.setQuantity(
                                    item.getQuantity()
                            );


                            return itemDTO;


                        })
                        .toList();



        dto.setItems(items);



        return dto;

    }


}
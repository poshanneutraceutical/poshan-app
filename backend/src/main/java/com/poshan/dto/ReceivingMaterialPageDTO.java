package com.poshan.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReceivingMaterialPageDTO {

    private Long id;

    private String receiverName;

    private String supplierName;

    private String billNumber;

    // Uploaded Images
    private List<String> materialPhotos;

    private LocalDateTime receivedDate;

    private LocalDateTime createdAt;

    private String remarks;

    private List<ReceivingMaterialItemDTO> receivingMaterialItems;

}
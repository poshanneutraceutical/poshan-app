package com.poshan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryCompanySummaryDTO {

    private Long companyId;

    private String companyName;

    private Long totalDeliveries;

    private LocalDateTime lastDeliveryDate;

    private LocalDateTime lastCreatedAt;
}
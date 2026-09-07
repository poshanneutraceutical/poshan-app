package com.poshan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {


    private long totalEmployees;

    private long totalVendors;

    private long totalProducts;

    private long totalPurchaseOrders;

    private long pendingPRs;

    private long lowStockItems;


}
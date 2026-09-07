package com.poshan.service;


import com.poshan.dto.DashboardDTO;
import com.poshan.entity.PRstatus;
import com.poshan.repository.EmployeeRepository;
import com.poshan.repository.InventoryRepository;
import com.poshan.repository.PRRepository;

import com.poshan.repository.PurchaseOrderRepository;
import com.poshan.repository.VendorRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class DashboardService {


    private final EmployeeRepository employeeRepository;

    private final VendorRepository vendorRepository;


    private final PurchaseOrderRepository purchaseOrderRepository;

    private final PRRepository prRepository;

    private final InventoryRepository inventoryRepository;



    public DashboardDTO getDashboardSummary() {


        return DashboardDTO.builder()

                .totalEmployees(
                        employeeRepository.count()
                )

                .totalVendors(
                        vendorRepository.count()
                )


                .totalPurchaseOrders(
                        purchaseOrderRepository.count()
                )

                .pendingPRs(
                        prRepository.countByStatus(PRstatus.Pending)
                )

                .lowStockItems(
                        inventoryRepository.countLowStockItems()
                )

                .build();

    }

}
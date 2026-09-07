package com.poshan.controller;

import com.poshan.dto.InventoryDashboardDTO;
import com.poshan.service.InventoryDashboardService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InventoryDashboardController {


    private final InventoryDashboardService
            inventoryDashboardService;


    // =========================================================
    // INVENTORY DASHBOARD
    // =========================================================

    @GetMapping
    public InventoryDashboardDTO
    getInventoryDashboard() {

        return inventoryDashboardService
                .getDashboard();

    }

}
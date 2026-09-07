package com.poshan.controller;

import com.poshan.dto.SalesDashboardDTO;
import com.poshan.service.SalesDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SalesDashboardController {

    private final SalesDashboardService salesDashboardService;


    @GetMapping
    public SalesDashboardDTO getSalesDashboard() {

        return salesDashboardService.getSalesDashboard();
    }

}
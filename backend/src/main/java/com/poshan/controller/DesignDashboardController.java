package com.poshan.controller;

import com.poshan.dto.DesignDashboardDTO;
import com.poshan.service.DesigningDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/designing/dashboard")
@RequiredArgsConstructor
public class DesignDashboardController {

    private final DesigningDashboardService designingDashboardService;

    @GetMapping
    public DesignDashboardDTO getDesignSummary() {
        return designingDashboardService.getdesignsummary();
    }
}
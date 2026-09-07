package com.poshan.controller;

import com.poshan.dto.WebDashboardDTO;
import com.poshan.service.WebDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/web/dashboard")
@RequiredArgsConstructor
public class WebDashboardController {

    private final WebDashboardService webDashboardService;


    @GetMapping
    public WebDashboardDTO getDashboardSummary() {

        return webDashboardService.getdashboardsummary();
    }
}
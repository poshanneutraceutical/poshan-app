package com.poshan.controller;


import com.poshan.dto.DashboardDTO;
import com.poshan.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {


    private final DashboardService dashboardService;



    @GetMapping
    public DashboardDTO getDashboard(){

        return dashboardService.getDashboardSummary();

    }


}
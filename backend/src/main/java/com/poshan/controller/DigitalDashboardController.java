package com.poshan.controller;

import com.poshan.dto.DigitalDashboardDTO;
import com.poshan.service.DigitalDshboardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/digital/dashboard")
@RequiredArgsConstructor
public class DigitalDashboardController {

    private final DigitalDshboardsService digitalDshboardsService;

    @GetMapping
    public DigitalDashboardDTO getDigitalSummary() {

        return digitalDshboardsService.getdigitalsummary();
    }
}
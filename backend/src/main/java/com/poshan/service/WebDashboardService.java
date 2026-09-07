package com.poshan.service;

import com.poshan.dto.WebDashboardDTO;
import com.poshan.entity.Projectstatus;
import com.poshan.repository.WebDevelopmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebDashboardService {

public final WebDevelopmentRepository webDevelopmentRepository;

    public WebDashboardDTO getdashboardsummary(){
         WebDashboardDTO summary = new WebDashboardDTO();
         summary.setTotalproject(webDevelopmentRepository.count());
        summary.setDelivered(webDevelopmentRepository.countByStatus(Projectstatus.DELIVER));
        summary.setCompleted(webDevelopmentRepository.countByStatus(Projectstatus.COMPLETED));
        summary.setOngoing(webDevelopmentRepository.countByStatus(Projectstatus.IN_PROGRESS));
        return summary;
    }

}

package com.poshan.service;


import com.poshan.dto.DesignDashboardDTO;
import com.poshan.entity.Projectstatus;
import com.poshan.entity.Taskstatus;
import com.poshan.repository.DesigningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DesigningDashboardService {

    private final DesigningRepository designingRepository;
    public DesignDashboardDTO getdesignsummary(){
        DesignDashboardDTO summary = new DesignDashboardDTO();

        summary.setTotaldelivered(designingRepository.countByStatus(Taskstatus.DELIVERED));
        summary.setTotalinprogress(designingRepository.countByStatus(Taskstatus.IN_PROGRESS));
        summary.setTotalcompleted(designingRepository.countByStatus(Taskstatus.COMPLETE));
        summary.setTotaldesignorder(designingRepository.count());

        return summary;

    }
}

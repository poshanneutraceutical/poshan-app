    package com.poshan.service;


    import com.poshan.dto.DigitalDashboardDTO;
    import com.poshan.dto.WebDashboardDTO;
    import com.poshan.entity.Projectstatus;
    import com.poshan.repository.DigitalMarketingRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;

    @Service
    @RequiredArgsConstructor
    public class DigitalDshboardsService {
        private final DigitalMarketingRepository digitalMarketingRepository;

        public DigitalDashboardDTO getdigitalsummary(){
            DigitalDashboardDTO summary = new DigitalDashboardDTO();

            summary.setTotalactivecampaign(digitalMarketingRepository.countByStatus(Projectstatus.IN_PROGRESS));
            summary.setTotalcompletedcampaign(digitalMarketingRepository.countByStatus(Projectstatus.COMPLETED));
            summary.setTotalleads(digitalMarketingRepository.count());

            return summary;
        }
    }

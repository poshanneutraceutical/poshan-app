package com.poshan.repository;

import com.poshan.entity.Digital;
import com.poshan.entity.Projectstatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DigitalMarketingRepository extends JpaRepository<Digital, Long> {
    long countByStatus(Projectstatus status);
}
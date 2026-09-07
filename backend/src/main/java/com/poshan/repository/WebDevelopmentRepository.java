package com.poshan.repository;


import com.poshan.entity.Projectstatus;

import com.poshan.entity.WebDevelopment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebDevelopmentRepository extends JpaRepository<WebDevelopment, Long> {
    long countByStatus(Projectstatus status);
}
package com.poshan.repository;

import com.poshan.entity.Company;
import com.poshan.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    List<Delivery> findByCompanyOrderByCreatedAtDesc(
            Company company
    );

    List<Delivery> findAllByOrderByCreatedAtDesc();
}
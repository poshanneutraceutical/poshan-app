package com.poshan.repository;


import com.poshan.entity.ProductionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ProductionRepository extends JpaRepository<ProductionEntity, Long> {
}

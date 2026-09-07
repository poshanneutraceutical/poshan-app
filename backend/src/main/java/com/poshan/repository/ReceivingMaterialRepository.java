package com.poshan.repository;

import com.poshan.entity.ReceivingMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceivingMaterialRepository extends JpaRepository<ReceivingMaterial, Long> {

}
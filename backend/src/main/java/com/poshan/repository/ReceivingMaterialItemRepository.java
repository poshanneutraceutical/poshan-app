package com.poshan.repository;

import com.poshan.entity.ReceivingMaterial;
import com.poshan.entity.ReceivingMaterialItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceivingMaterialItemRepository extends JpaRepository<ReceivingMaterialItem, Long> {

    List<ReceivingMaterialItem> findByReceivingMaterial(ReceivingMaterial receivingMaterial);

}
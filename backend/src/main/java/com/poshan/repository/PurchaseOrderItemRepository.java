package com.poshan.repository;

import com.poshan.entity.PurchaseOrder;
import com.poshan.entity.PurchaseOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseOrderItemRepository
        extends JpaRepository<PurchaseOrderItem, Long> {

    List<PurchaseOrderItem> findByPurchaseOrder(PurchaseOrder purchaseOrder);

    void deleteByPurchaseOrder(PurchaseOrder purchaseOrder);

}
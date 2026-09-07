package com.poshan.repository;

import com.poshan.entity.PR;
import com.poshan.entity.PurchaseOrder;
import com.poshan.entity.PurchaseOrderStatus;
import com.poshan.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {


    // Find PO by unique PO number
    Optional<PurchaseOrder> findByPoNumber(String poNumber);


    // Find all purchase orders of a vendor
    List<PurchaseOrder> findByVendor(Vendor vendor);


    // Find purchase orders by status
    List<PurchaseOrder> findByStatus(PurchaseOrderStatus status);


    // Check duplicate PO number
    boolean existsByPoNumber(String poNumber);

    boolean existsByPr(PR pr);

}
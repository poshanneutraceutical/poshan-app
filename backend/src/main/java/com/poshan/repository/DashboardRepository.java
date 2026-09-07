package com.poshan.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository {


    long getTotalEmployees();


    long getTotalVendors();


    long getTotalPurchaseOrders();


    long getPendingPR();


    long getLowStockItems();


}
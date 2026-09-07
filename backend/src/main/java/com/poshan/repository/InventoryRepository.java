package com.poshan.repository;

import com.poshan.entity.BoxType;
import com.poshan.entity.Inventory;
import com.poshan.entity.InventoryCategory;
import com.poshan.entity.Material;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {


    Optional<Inventory>
    findByBoxType(
            BoxType boxType
    );


    Optional<Inventory>
    findByCategoryAndBoxType(
            InventoryCategory category,
            BoxType boxType
    );


    Optional<Inventory>
    findByCategoryAndMaterial(
            InventoryCategory category,
            Material material
    );


    Optional<Inventory>
    findByMaterial(
            Material material
    );


    List<Inventory>
    findAllByCategoryOrderByIdDesc(
            InventoryCategory category
    );


    List<Inventory>
    findAllByOrderByIdDesc();


    @Query("""
            SELECT COUNT(i)
            FROM Inventory i
            WHERE i.availableQuantity <= i.minimumQuantity
            """)
    long countLowStockItems();


    @Query("""
            SELECT COUNT(i)
            FROM Inventory i
            WHERE i.category = :category
            AND i.availableQuantity <= i.minimumQuantity
            """)
    long countLowStockByCategory(
            InventoryCategory category
    );
}
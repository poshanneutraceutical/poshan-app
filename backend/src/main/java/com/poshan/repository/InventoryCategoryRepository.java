package com.poshan.repository;

import com.poshan.entity.InventoryCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryCategoryRepository
        extends JpaRepository<InventoryCategory, Long> {

    Optional<InventoryCategory>
    findByNameIgnoreCase(
            String name
    );

    boolean
    existsByNameIgnoreCase(
            String name
    );

    List<InventoryCategory>
    findAllByActiveTrueOrderByNameAsc();
}
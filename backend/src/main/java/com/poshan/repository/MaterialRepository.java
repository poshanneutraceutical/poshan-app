package com.poshan.repository;

import com.poshan.entity.InventoryCategory;
import com.poshan.entity.Material;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepository
        extends JpaRepository<Material, Long> {

    Optional<Material>
    findByNameIgnoreCaseAndCategory(
            String name,
            InventoryCategory category
    );


    boolean
    existsByNameIgnoreCaseAndCategory(
            String name,
            InventoryCategory category
    );


    List<Material>
    findAllByCategoryAndActiveTrueOrderByNameAsc(
            InventoryCategory category
    );


    List<Material>
    findAllByActiveTrueOrderByNameAsc();
}
package com.poshan.service;

import com.poshan.dto.InventoryCategoryDTO;
import com.poshan.entity.InventoryCategory;
import com.poshan.repository.InventoryCategoryRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryCategoryService {

    private final InventoryCategoryRepository categoryRepository;


    // =========================================================
    // GET ALL ACTIVE CATEGORIES
    // =========================================================

    @Transactional(readOnly = true)
    public List<InventoryCategoryDTO>
    getAllCategories() {

        return categoryRepository
                .findAllByActiveTrueOrderByNameAsc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    // =========================================================
    // GET BY ID
    // =========================================================

    @Transactional(readOnly = true)
    public InventoryCategoryDTO
    getById(Long id) {

        InventoryCategory category =
                categoryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory category not found"
                                )
                        );

        return mapToDTO(category);
    }


    // =========================================================
    // CREATE CATEGORY
    // =========================================================

    public InventoryCategoryDTO
    createCategory(
            InventoryCategoryDTO dto
    ) {

        if (
                dto.getName() == null ||
                        dto.getName().trim().isEmpty()
        ) {

            throw new RuntimeException(
                    "Inventory category name is required"
            );
        }


        String name =
                dto.getName().trim();


        if (
                categoryRepository
                        .existsByNameIgnoreCase(name)
        ) {

            throw new RuntimeException(
                    "Inventory category already exists"
            );
        }


        InventoryCategory category =
                new InventoryCategory();


        category.setName(name);

        category.setActive(true);

        category.setCreatedAt(
                LocalDateTime.now()
        );

        category.setUpdatedAt(
                LocalDateTime.now()
        );


        return mapToDTO(
                categoryRepository.save(
                        category
                )
        );
    }


    // =========================================================
    // UPDATE
    // =========================================================

    public InventoryCategoryDTO
    updateCategory(
            Long id,
            InventoryCategoryDTO dto
    ) {

        InventoryCategory category =
                categoryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory category not found"
                                )
                        );


        String name =
                dto.getName() == null
                        ? category.getName()
                        : dto.getName().trim();


        InventoryCategory duplicate =
                categoryRepository
                        .findByNameIgnoreCase(name)
                        .orElse(null);


        if (
                duplicate != null &&
                        !duplicate.getId().equals(id)
        ) {

            throw new RuntimeException(
                    "Inventory category already exists"
            );
        }


        category.setName(name);


        if (
                dto.getActive() != null
        ) {

            category.setActive(
                    dto.getActive()
            );
        }


        category.setUpdatedAt(
                LocalDateTime.now()
        );


        return mapToDTO(
                categoryRepository.save(
                        category
                )
        );
    }


    // =========================================================
    // DEACTIVATE
    // =========================================================

    public void deactivate(
            Long id
    ) {

        InventoryCategory category =
                categoryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory category not found"
                                )
                        );


        category.setActive(false);

        category.setUpdatedAt(
                LocalDateTime.now()
        );


        categoryRepository.save(category);
    }


    // =========================================================
    // MAP
    // =========================================================

    private InventoryCategoryDTO
    mapToDTO(
            InventoryCategory category
    ) {

        InventoryCategoryDTO dto =
                new InventoryCategoryDTO();


        dto.setId(
                category.getId()
        );

        dto.setName(
                category.getName()
        );

        dto.setActive(
                category.getActive()
        );

        dto.setCreatedAt(
                category.getCreatedAt()
        );

        dto.setUpdatedAt(
                category.getUpdatedAt()
        );


        return dto;
    }
}
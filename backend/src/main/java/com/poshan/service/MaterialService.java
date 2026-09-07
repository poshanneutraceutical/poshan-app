package com.poshan.service;

import com.poshan.dto.MaterialDTO;

import com.poshan.entity.InventoryCategory;
import com.poshan.entity.Material;

import com.poshan.repository.InventoryCategoryRepository;
import com.poshan.repository.MaterialRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MaterialService {

    private final MaterialRepository materialRepository;

    private final InventoryCategoryRepository categoryRepository;


    // =========================================================
    // GET ALL ACTIVE
    // =========================================================

    @Transactional(readOnly = true)
    public List<MaterialDTO>
    getAllMaterials() {

        return materialRepository
                .findAllByActiveTrueOrderByNameAsc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    // =========================================================
    // GET BY CATEGORY
    // =========================================================

    @Transactional(readOnly = true)
    public List<MaterialDTO>
    getByCategory(
            Long categoryId
    ) {

        InventoryCategory category =
                categoryRepository
                        .findById(categoryId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory category not found"
                                )
                        );


        return materialRepository
                .findAllByCategoryAndActiveTrueOrderByNameAsc(
                        category
                )
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    // =========================================================
    // GET BY ID
    // =========================================================

    @Transactional(readOnly = true)
    public MaterialDTO
    getById(
            Long id
    ) {

        Material material =
                materialRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Material not found"
                                )
                        );


        return mapToDTO(material);
    }


    // =========================================================
    // CREATE MATERIAL
    // =========================================================

    public MaterialDTO
    createMaterial(
            MaterialDTO dto
    ) {

        if (
                dto.getName() == null ||
                        dto.getName().trim().isEmpty()
        ) {

            throw new RuntimeException(
                    "Material name is required"
            );
        }


        if (
                dto.getCategoryId() == null
        ) {

            throw new RuntimeException(
                    "Category is required"
            );
        }


        InventoryCategory category =
                categoryRepository
                        .findById(
                                dto.getCategoryId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Inventory category not found"
                                )
                        );


        String name =
                dto.getName().trim();


        if (
                materialRepository
                        .existsByNameIgnoreCaseAndCategory(
                                name,
                                category
                        )
        ) {

            throw new RuntimeException(
                    "Material already exists in this category"
            );
        }


        Material material =
                new Material();


        material.setName(name);

        material.setCategory(category);

        material.setActive(true);

        material.setCreatedAt(
                LocalDateTime.now()
        );

        material.setUpdatedAt(
                LocalDateTime.now()
        );


        return mapToDTO(
                materialRepository.save(
                        material
                )
        );
    }


    // =========================================================
    // UPDATE
    // =========================================================

    public MaterialDTO
    updateMaterial(
            Long id,
            MaterialDTO dto
    ) {

        Material material =
                materialRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Material not found"
                                )
                        );


        String name =
                dto.getName() == null
                        ? material.getName()
                        : dto.getName().trim();


        InventoryCategory category =
                material.getCategory();


        if (
                dto.getCategoryId() != null
        ) {

            category =
                    categoryRepository
                            .findById(
                                    dto.getCategoryId()
                            )
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Inventory category not found"
                                    )
                            );
        }


        Material duplicate =
                materialRepository
                        .findByNameIgnoreCaseAndCategory(
                                name,
                                category
                        )
                        .orElse(null);


        if (
                duplicate != null &&
                        !duplicate.getId().equals(id)
        ) {

            throw new RuntimeException(
                    "Material already exists in this category"
            );
        }


        material.setName(name);

        material.setCategory(category);


        if (
                dto.getActive() != null
        ) {

            material.setActive(
                    dto.getActive()
            );
        }


        material.setUpdatedAt(
                LocalDateTime.now()
        );


        return mapToDTO(
                materialRepository.save(
                        material
                )
        );
    }


    // =========================================================
    // DEACTIVATE
    // =========================================================

    public void deactivate(
            Long id
    ) {

        Material material =
                materialRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Material not found"
                                )
                        );


        material.setActive(false);

        material.setUpdatedAt(
                LocalDateTime.now()
        );


        materialRepository.save(material);
    }


    // =========================================================
    // MAP
    // =========================================================

    private MaterialDTO mapToDTO(
            Material material
    ) {

        MaterialDTO dto =
                new MaterialDTO();


        dto.setId(
                material.getId()
        );


        dto.setName(
                material.getName()
        );


        if (
                material.getCategory() != null
        ) {

            dto.setCategoryId(
                    material
                            .getCategory()
                            .getId()
            );

            dto.setCategoryName(
                    material
                            .getCategory()
                            .getName()
            );
        }


        dto.setActive(
                material.getActive()
        );


        dto.setCreatedAt(
                material.getCreatedAt()
        );


        dto.setUpdatedAt(
                material.getUpdatedAt()
        );


        return dto;
    }
}
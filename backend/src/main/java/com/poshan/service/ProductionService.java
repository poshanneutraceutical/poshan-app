package com.poshan.service;

import com.poshan.dto.ProductionDTO;
import com.poshan.entity.Material;
import com.poshan.entity.ProductionEntity;

import com.poshan.repository.MaterialRepository;
import com.poshan.repository.ProductionRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductionService {

    private final ProductionRepository productionRepository;

    private final MaterialRepository materialRepository;


    public ProductionDTO createplan(
            ProductionDTO dto
    ) {

        ProductionEntity plan =
                new ProductionEntity();


        plan.setPlandate(
                dto.getPlandate()
        );

        plan.setTittle(
                dto.getTittle()
        );

        plan.setDescription(
                dto.getDescription()
        );

        plan.setAssignby(
                dto.getAssignby()
        );

        plan.setExecutedate(
                dto.getExecutedate()
        );

        plan.setStatus(
                dto.getStatus()
        );

        plan.setScoope(
                dto.getScoope()
        );

        plan.setBoxtype(
                dto.getBoxtype()
        );

        plan.setWeight(
                dto.getWeight()
        );

        plan.setNeckseal(
                dto.getNeckseal()
        );

        plan.setCompanyname(
                dto.getCompanyname()
        );

        plan.setNecksealtype(
                dto.getNecksealtype()
        );


        if (
                dto.getMaterialId() != null
        ) {

            Material material =
                    materialRepository
                            .findById(
                                    dto.getMaterialId()
                            )
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Material not found"
                                    )
                            );

            plan.setMaterial(
                    material
            );
        }


        ProductionEntity saved =
                productionRepository.save(
                        plan
                );


        return mapToDTO(
                saved
        );
    }


    public ProductionDTO updateplan(
            Long id,
            ProductionDTO dto
    ) {

        ProductionEntity plan =
                productionRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Production plan not found with id : " +
                                                id
                                )
                        );


        plan.setPlandate(
                dto.getPlandate()
        );

        plan.setTittle(
                dto.getTittle()
        );

        plan.setDescription(
                dto.getDescription()
        );

        plan.setAssignby(
                dto.getAssignby()
        );

        plan.setExecutedate(
                dto.getExecutedate()
        );

        plan.setStatus(
                dto.getStatus()
        );

        plan.setScoope(
                dto.getScoope()
        );

        plan.setBoxtype(
                dto.getBoxtype()
        );

        plan.setWeight(
                dto.getWeight()
        );

        plan.setNeckseal(
                dto.getNeckseal()
        );

        plan.setCompanyname(
                dto.getCompanyname()
        );

        plan.setNecksealtype(
                dto.getNecksealtype()
        );


        if (
                dto.getMaterialId() != null
        ) {

            Material material =
                    materialRepository
                            .findById(
                                    dto.getMaterialId()
                            )
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Material not found"
                                    )
                            );

            plan.setMaterial(
                    material
            );

        }
        else {

            plan.setMaterial(null);
        }


        return mapToDTO(
                productionRepository.save(
                        plan
                )
        );
    }


    public List<ProductionDTO> getallplan() {

        return productionRepository
                .findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    public ProductionDTO getplanbyid(
            Long id
    ) {

        ProductionEntity plan =
                productionRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Production plan not found with id : " +
                                                id
                                )
                        );


        return mapToDTO(
                plan
        );
    }


    public void deleteplan(
            Long id
    ) {

        ProductionEntity plan =
                productionRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Production plan not found with id : " +
                                                id
                                )
                        );


        productionRepository.delete(
                plan
        );
    }


    private ProductionDTO mapToDTO(
            ProductionEntity entity
    ) {

        ProductionDTO dto =
                new ProductionDTO();


        dto.setId(
                entity.getId()
        );

        dto.setPlandate(
                entity.getPlandate()
        );

        dto.setTittle(
                entity.getTittle()
        );

        dto.setDescription(
                entity.getDescription()
        );

        dto.setAssignby(
                entity.getAssignby()
        );

        dto.setExecutedate(
                entity.getExecutedate()
        );

        dto.setStatus(
                entity.getStatus()
        );

        dto.setScoope(
                entity.getScoope()
        );

        dto.setBoxtype(
                entity.getBoxtype()
        );

        dto.setWeight(
                entity.getWeight()
        );

        dto.setNeckseal(
                entity.getNeckseal()
        );

        dto.setCompanyname(
                entity.getCompanyname()
        );

        dto.setNecksealtype(
                entity.getNecksealtype()
        );


        if (
                entity.getMaterial() != null
        ) {

            dto.setMaterialId(
                    entity.getMaterial().getId()
            );

            dto.setMaterialName(
                    entity.getMaterial().getName()
            );

            dto.setMaterialType(
                    entity.getMaterial().getCategory() != null
                            ? entity.getMaterial().getCategory().getName()
                            : null
            );
        }

        return dto;
    }
}
package com.poshan.controller;

import com.poshan.dto.ProductionDTO;
import com.poshan.service.ProductionService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/production")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductionController {

    private final ProductionService productionService;


    @PostMapping
    public ResponseEntity<ProductionDTO>
    createPlan(
            @RequestBody ProductionDTO productionDTO
    ) {

        return ResponseEntity.ok(
                productionService.createplan(
                        productionDTO
                )
        );
    }


    @GetMapping
    public ResponseEntity<List<ProductionDTO>>
    getAllPlans() {

        return ResponseEntity.ok(
                productionService.getallplan()
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductionDTO>
    getPlanById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                productionService.getplanbyid(id)
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<ProductionDTO>
    updatePlan(
            @PathVariable Long id,
            @RequestBody ProductionDTO productionDTO
    ) {

        return ResponseEntity.ok(
                productionService.updateplan(
                        id,
                        productionDTO
                )
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deletePlan(
            @PathVariable Long id
    ) {

        productionService.deleteplan(id);

        return ResponseEntity.ok(
                "Production plan deleted successfully."
        );
    }
}
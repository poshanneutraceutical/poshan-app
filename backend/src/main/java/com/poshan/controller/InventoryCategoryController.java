package com.poshan.controller;

import com.poshan.dto.InventoryCategoryDTO;
import com.poshan.service.InventoryCategoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory-categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InventoryCategoryController {

    private final InventoryCategoryService categoryService;


    // =========================================================
    // GET ALL
    // =========================================================

    @GetMapping
    public ResponseEntity<List<InventoryCategoryDTO>>
    getAllCategories() {

        return ResponseEntity.ok(
                categoryService.getAllCategories()
        );
    }


    // =========================================================
    // GET BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<InventoryCategoryDTO>
    getById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                categoryService.getById(id)
        );
    }


    // =========================================================
    // CREATE
    // =========================================================

    @PostMapping
    public ResponseEntity<InventoryCategoryDTO>
    create(
            @RequestBody InventoryCategoryDTO dto
    ) {

        return new ResponseEntity<>(
                categoryService.createCategory(dto),
                HttpStatus.CREATED
        );
    }


    // =========================================================
    // UPDATE
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<InventoryCategoryDTO>
    update(
            @PathVariable Long id,
            @RequestBody InventoryCategoryDTO dto
    ) {

        return ResponseEntity.ok(
                categoryService.updateCategory(
                        id,
                        dto
                )
        );
    }


    // =========================================================
    // DEACTIVATE
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deactivate(
            @PathVariable Long id
    ) {

        categoryService.deactivate(id);

        return ResponseEntity.noContent()
                .build();
    }
}
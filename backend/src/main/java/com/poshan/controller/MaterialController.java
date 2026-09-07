package com.poshan.controller;

import com.poshan.dto.MaterialDTO;
import com.poshan.service.MaterialService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MaterialController {

    private final MaterialService materialService;


    @GetMapping
    public ResponseEntity<List<MaterialDTO>>
    getAll() {

        return ResponseEntity.ok(
                materialService.getAllMaterials()
        );
    }


    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<MaterialDTO>>
    getByCategory(
            @PathVariable Long categoryId
    ) {

        return ResponseEntity.ok(
                materialService.getByCategory(
                        categoryId
                )
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<MaterialDTO>
    getById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                materialService.getById(id)
        );
    }


    @PostMapping
    public ResponseEntity<MaterialDTO>
    create(
            @RequestBody MaterialDTO dto
    ) {

        return new ResponseEntity<>(
                materialService.createMaterial(dto),
                HttpStatus.CREATED
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<MaterialDTO>
    update(
            @PathVariable Long id,
            @RequestBody MaterialDTO dto
    ) {

        return ResponseEntity.ok(
                materialService.updateMaterial(
                        id,
                        dto
                )
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deactivate(
            @PathVariable Long id
    ) {

        materialService.deactivate(id);

        return ResponseEntity.noContent()
                .build();
    }
}
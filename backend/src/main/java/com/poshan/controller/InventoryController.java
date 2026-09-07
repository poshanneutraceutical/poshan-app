package com.poshan.controller;

import com.poshan.dto.InventoryCategorySummaryDTO;
import com.poshan.dto.InventoryDTO;
import com.poshan.dto.InventoryPageDTO;

import com.poshan.entity.BoxType;

import com.poshan.service.InventoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InventoryController {


    private final InventoryService inventoryService;


    // =========================================================
    // ALL INVENTORY
    // =========================================================

    @GetMapping
    public List<InventoryDTO> getAllInventory() {

        return inventoryService
                .getAllInventory();

    }


    // =========================================================
    // CATEGORY SUMMARY
    // =========================================================

    @GetMapping("/category-summary")
    public List<InventoryCategorySummaryDTO>
    getCategorySummary() {

        return inventoryService
                .getCategorySummary();

    }


    // =========================================================
    // INVENTORY BY CATEGORY
    // =========================================================

    @GetMapping("/category/{categoryId}")
    public List<InventoryDTO>
    getInventoryByCategory(
            @PathVariable Long categoryId
    ) {

        return inventoryService
                .getInventoryByCategory(
                        categoryId
                );

    }


    // =========================================================
    // GET BY ID
    // =========================================================

    @GetMapping("/{id}")
    public InventoryPageDTO
    getInventoryById(
            @PathVariable Long id
    ) {

        return inventoryService
                .getInventoryById(
                        id
                );

    }


    // =========================================================
    // GET BOX
    // =========================================================

    @GetMapping("/box/{boxType}")
    public InventoryDTO
    getInventoryByBoxType(
            @PathVariable BoxType boxType
    ) {

        return inventoryService
                .getInventoryByBoxType(
                        boxType
                );

    }


    // =========================================================
    // CREATE
    // =========================================================

    @PostMapping
    public InventoryDTO
    createInventory(
            @RequestBody InventoryDTO dto
    ) {

        return inventoryService
                .createInventory(
                        dto
                );

    }


    // =========================================================
    // UPDATE
    // =========================================================

    @PutMapping("/{id}")
    public InventoryDTO
    updateInventory(
            @PathVariable Long id,
            @RequestBody InventoryDTO dto
    ) {

        return inventoryService
                .updateInventory(
                        id,
                        dto
                );

    }


    // =========================================================
    // LOW STOCK
    // =========================================================

    @GetMapping("/low-stock")
    public List<InventoryPageDTO>
    getLowStockInventory() {

        return inventoryService
                .getLowStockInventory();

    }


    // =========================================================
    // DELETE
    // =========================================================

    @DeleteMapping("/{id}")
    public void deleteInventory(
            @PathVariable Long id
    ) {

        inventoryService
                .deleteInventory(
                        id
                );

    }

}
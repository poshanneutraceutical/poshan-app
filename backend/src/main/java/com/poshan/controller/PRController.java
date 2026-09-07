package com.poshan.controller;

import com.poshan.dto.PR_PageDTO;
import com.poshan.dto.PR_DTO;
import com.poshan.service.PRService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procurement/pr")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PRController {

    private final PRService prService;


    // ==========================
    // CREATE PURCHASE REQUEST
    // ==========================
    @PostMapping
    public PR_DTO createPR(
            @RequestBody PR_DTO prDTO) {

        return prService.createPR(prDTO);
    }


    // ==========================
    // UPDATE PURCHASE REQUEST
    // ==========================
    @PutMapping("/{id}")
    public PR_DTO updatePR(
            @PathVariable Long id,
            @RequestBody PR_DTO prDTO) {

        return prService.updatePR(id, prDTO);
    }


    // ==========================
    // GET ALL PR
    // ==========================
    @GetMapping
    public List<PR_DTO> getAllPR() {

        return prService.getAllPR();
    }


    // ==========================
    // GET PR PAGE DATA
    // ==========================
    @GetMapping("/page")
    public List<PR_PageDTO> getAllPRPageData() {

        return prService.getAllPRPageData();
    }


    // ==========================
    // GET PR BY ID
    // ==========================
    @GetMapping("/{id}")
    public PR_PageDTO getPRById(
            @PathVariable Long id) {

        return prService.getPRById(id);
    }


    // ==========================
    // DELETE PR
    // ==========================
    @DeleteMapping("/{id}")
    public String deletePR(
            @PathVariable Long id) {

        prService.deletePR(id);

        return "PR deleted successfully";
    }
}
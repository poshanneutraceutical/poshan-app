package com.poshan.controller;

import com.poshan.dto.CompanyDetailDTO;
import com.poshan.dto.CompanyPageDTO;
import com.poshan.dto.CompanyRequestDTO;
import com.poshan.dto.CompanyResponseDTO;
import com.poshan.dto.CustomFieldDTO;
import com.poshan.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SalesController {

    private final SalesService salesService;


    /*
     ==========================================
     CREATE COMPANY
     ==========================================
     */

    @PostMapping("/company")
    public ResponseEntity<CompanyResponseDTO> createCompany(
            @RequestBody CompanyRequestDTO companyRequestDTO
    ) {

        return ResponseEntity.ok(
                salesService.createcompany(
                        companyRequestDTO
                )
        );
    }


    /*
     ==========================================
     UPDATE COMPANY
     ==========================================
     */

    @PutMapping("/company/{id}")
    public ResponseEntity<CompanyResponseDTO> updateCompany(
            @PathVariable Long id,
            @RequestBody CompanyRequestDTO companyRequestDTO
    ) {

        return ResponseEntity.ok(
                salesService.updatecompany(
                        id,
                        companyRequestDTO
                )
        );
    }


    /*
     ==========================================
     GET ALL COMPANIES
     ==========================================
     */

    @GetMapping("/companies")
    public ResponseEntity<List<CompanyResponseDTO>> getAllCompanies() {

        return ResponseEntity.ok(
                salesService.getallcompany()
        );
    }


    /*
     ==========================================
     GET COMPLETE COMPANY PAGE
     ==========================================
     */

    @GetMapping("/company/{id}")
    public ResponseEntity<CompanyPageDTO> getCompanyPage(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                salesService.getCompanyPage(id)
        );
    }


    /*
     ==========================================
     GET COMPANY NAME FOR EDIT
     ==========================================
     */

    @GetMapping("/company/edit/{id}")
    public ResponseEntity<CompanyResponseDTO> getCompanyById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                salesService.getCompanyById(id)
        );
    }


    /*
     ==========================================
     CREATE COMPANY DETAIL
     ==========================================
     */

    @PostMapping("/company-detail")
    public ResponseEntity<CompanyDetailDTO> createDetail(
            @RequestBody CompanyDetailDTO companyDetailDTO
    ) {

        return ResponseEntity.ok(
                salesService.createdetail(
                        companyDetailDTO
                )
        );
    }


    /*
     ==========================================
     UPDATE COMPANY DETAIL
     ==========================================
     */

    @PutMapping("/company-detail/{id}")
    public ResponseEntity<CompanyDetailDTO> updateDetail(
            @PathVariable Long id,
            @RequestBody CompanyDetailDTO companyDetailDTO
    ) {

        return ResponseEntity.ok(
                salesService.updatedetail(
                        id,
                        companyDetailDTO
                )
        );
    }


    /*
     ==========================================
     CREATE CUSTOM FIELD
     ==========================================
     */

    @PostMapping("/custom-field")
    public ResponseEntity<CustomFieldDTO> createField(
            @RequestBody CustomFieldDTO customFieldDTO
    ) {

        return ResponseEntity.ok(
                salesService.createfield(
                        customFieldDTO
                )
        );
    }


    /*
     ==========================================
     UPDATE CUSTOM FIELD
     ==========================================
     */

    @PutMapping("/custom-field/{id}")
    public ResponseEntity<CustomFieldDTO> updateField(
            @PathVariable Long id,
            @RequestBody CustomFieldDTO customFieldDTO
    ) {

        return ResponseEntity.ok(
                salesService.updatefield(
                        id,
                        customFieldDTO
                )
        );
    }


    /*
     ==========================================
     DELETE COMPANY
     ==========================================
     */

    @DeleteMapping("/company/{id}")
    public ResponseEntity<String> deleteCompany(
            @PathVariable Long id
    ) {

        salesService.deletecompanybyid(id);

        return ResponseEntity.ok(
                "Company deleted successfully."
        );
    }

}
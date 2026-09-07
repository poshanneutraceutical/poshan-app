package com.poshan.controller;

import com.poshan.dto.DigitalDTO;
import com.poshan.service.DigitalMarketingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/digital/marketing")
@RequiredArgsConstructor
public class DigitalMarketingController {

    private final DigitalMarketingService digitalMarketingService;


    // ==========================
    // CREATE DIGITAL PROJECT
    // ==========================
    @PostMapping
    public ResponseEntity<DigitalDTO> createDigitalProject(
            @RequestBody DigitalDTO digitalDTO) {

        if (digitalDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(
                digitalMarketingService.createdigitalproject(digitalDTO),
                HttpStatus.CREATED
        );
    }


    // ==========================
    // UPDATE DIGITAL PROJECT
    // ==========================
    @PutMapping("/{id}")
    public ResponseEntity<DigitalDTO> updateDigitalProject(
            @PathVariable Long id,
            @RequestBody DigitalDTO digitalDTO) {

        return ResponseEntity.ok(
                digitalMarketingService.updatedigitalproject(id, digitalDTO)
        );
    }


    // ==========================
    // GET DIGITAL PROJECT BY ID
    // ==========================
    @GetMapping("/{id}")
    public ResponseEntity<DigitalDTO> getDigitalProjectById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                digitalMarketingService.getdigitalprojectbyid(id)
        );
    }


    // ==========================
    // GET ALL DIGITAL PROJECTS
    // ==========================
    @GetMapping
    public ResponseEntity<List<DigitalDTO>> getAllDigitalProject() {

        return ResponseEntity.ok(
                digitalMarketingService.getalldigitalproject()
        );
    }


    // ==========================
    // DELETE DIGITAL PROJECT
    // ==========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDigitalProject(
            @PathVariable Long id) {

        digitalMarketingService.deletedigitalproject(id);

        return ResponseEntity.ok(
                "Digital project deleted successfully"
        );
    }
}
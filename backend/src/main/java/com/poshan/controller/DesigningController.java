package com.poshan.controller;

import com.poshan.dto.DesigningDTO;
import com.poshan.service.DesigningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designing/projects")
@RequiredArgsConstructor
public class DesigningController {

    private final DesigningService designingService;


    // ==========================
    // CREATE DESIGN PROJECT
    // ==========================
    @PostMapping
    public ResponseEntity<DesigningDTO> createDesignProject(
            @RequestBody DesigningDTO designingDTO) {

        return new ResponseEntity<>(
                designingService.creatdesignproject(designingDTO),
                HttpStatus.CREATED
        );
    }


    // ==========================
    // UPDATE DESIGN PROJECT
    // ==========================
    @PutMapping("/{id}")
    public ResponseEntity<DesigningDTO> updateDesignProject(
            @PathVariable Long id,
            @RequestBody DesigningDTO designingDTO) {

        return ResponseEntity.ok(
                designingService.updatedesignproject(id, designingDTO)
        );
    }


    // ==========================
    // GET DESIGN PROJECT BY ID
    // ==========================
    @GetMapping("/{id}")
    public ResponseEntity<DesigningDTO> getDesignProjectById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                designingService.getdesignprojectbyid(id)
        );
    }


    // ==========================
    // GET ALL DESIGN PROJECTS
    // ==========================
    @GetMapping
    public ResponseEntity<List<DesigningDTO>> getAllDesignProjects() {

        return ResponseEntity.ok(
                designingService.getalldesignproject()
        );
    }


    // ==========================
    // DELETE DESIGN PROJECT
    // ==========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDesignProject(
            @PathVariable Long id) {

        designingService.deletedesignproject(id);

        return ResponseEntity.ok(
                "Design project deleted successfully"
        );
    }
}
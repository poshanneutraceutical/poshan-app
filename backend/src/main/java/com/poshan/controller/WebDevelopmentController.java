package com.poshan.controller;

import com.poshan.dto.WebDevelopmentDTO;
import com.poshan.service.WebDevelopmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/web/development")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WebDevelopmentController {

    private final WebDevelopmentService webDevelopmentService;


    // ==========================
    // CREATE WEB PROJECT
    // ==========================
    @PostMapping
    public ResponseEntity<WebDevelopmentDTO> createProject(
            @Valid @RequestBody WebDevelopmentDTO webDevelopmentDTO) {

        WebDevelopmentDTO project =
                webDevelopmentService.createProject(webDevelopmentDTO);

        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }


    // ==========================
    // GET PROJECT BY ID
    // ==========================
    @GetMapping("/{id}")
    public ResponseEntity<WebDevelopmentDTO> getProjectById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                webDevelopmentService.getProjectById(id)
        );
    }


    // ==========================
    // GET ALL PROJECTS
    // ==========================
    @GetMapping
    public ResponseEntity<List<WebDevelopmentDTO>> getAllProjects() {

        return ResponseEntity.ok(
                webDevelopmentService.getAllProject()
        );
    }


    // ==========================
    // UPDATE PROJECT
    // ==========================
    @PutMapping("/{id}")
    public ResponseEntity<WebDevelopmentDTO> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody WebDevelopmentDTO webDevelopmentDTO) {

        return ResponseEntity.ok(
                webDevelopmentService.updateProject(id, webDevelopmentDTO)
        );
    }


    // ==========================
    // DELETE PROJECT
    // ==========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(
            @PathVariable Long id) {

        webDevelopmentService.deleteProjectById(id);

        return ResponseEntity.ok(
                "Project deleted successfully."
        );
    }
}
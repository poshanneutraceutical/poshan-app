package com.poshan.controller;

import com.poshan.dto.OpeningDTO;
import com.poshan.service.OpeningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr/openings")
@RequiredArgsConstructor
public class OpeningController {

    private final OpeningService openingService;


    // ==========================
    // CREATE JOB OPENING
    // ==========================
    @PostMapping
    public ResponseEntity<OpeningDTO> createJob(
            @RequestBody OpeningDTO openingDTO) {

        return new ResponseEntity<>(
                openingService.createjob(openingDTO),
                HttpStatus.CREATED
        );
    }


    // ==========================
    // GET ALL JOB OPENINGS
    // ==========================
    @GetMapping
    public ResponseEntity<List<OpeningDTO>> getAllJob() {

        return ResponseEntity.ok(
                openingService.getalljob()
        );
    }


    // ==========================
    // GET JOB BY ID
    // ==========================
    @GetMapping("/{id}")
    public ResponseEntity<OpeningDTO> getJobById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                openingService.getjobbyid(id)
        );
    }


    // ==========================
    // UPDATE JOB OPENING
    // ==========================
    @PutMapping("/{id}")
    public ResponseEntity<OpeningDTO> updateJob(
            @PathVariable Long id,
            @RequestBody OpeningDTO openingDTO) {

        return ResponseEntity.ok(
                openingService.updatejob(id, openingDTO)
        );
    }


    // ==========================
    // DELETE JOB OPENING
    // ==========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJobById(
            @PathVariable Long id) {

        openingService.deletejobbyid(id);

        return ResponseEntity.ok(
                "Job deleted successfully"
        );
    }
}
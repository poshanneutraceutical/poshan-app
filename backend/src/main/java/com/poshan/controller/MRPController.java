package com.poshan.controller;

import com.poshan.dto.MRPDTO;
import com.poshan.service.MRPService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mrp")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MRPController {

    private final MRPService mrpService;


    // =========================================================
    // CREATE MRP
    // POST /api/mrp
    // =========================================================

    @PostMapping
    public ResponseEntity<MRPDTO> createMrp(
            @RequestBody MRPDTO mrpDTO
    ) {

        MRPDTO createdMrp =
                mrpService.createMrpDetails(mrpDTO);

        return new ResponseEntity<>(
                createdMrp,
                HttpStatus.CREATED
        );
    }


    // =========================================================
    // GET MRP BY ID
    // GET /api/mrp/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<MRPDTO> getMrpById(
            @PathVariable Long id
    ) {

        MRPDTO mrpDTO =
                mrpService.getMrpById(id);

        return ResponseEntity.ok(mrpDTO);
    }


    // =========================================================
    // GET ALL MRP
    // GET /api/mrp
    // =========================================================

    @GetMapping
    public ResponseEntity<List<MRPDTO>> getAllMrp() {

        List<MRPDTO> mrpList =
                mrpService.getAllMrpDetails();

        return ResponseEntity.ok(mrpList);
    }


    // =========================================================
    // UPDATE MRP
    // PUT /api/mrp/{id}
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<MRPDTO> updateMrp(
            @PathVariable Long id,
            @RequestBody MRPDTO mrpDTO
    ) {

        MRPDTO updatedMrp =
                mrpService.updateMrpDetails(
                        id,
                        mrpDTO
                );

        return ResponseEntity.ok(updatedMrp);
    }


    // =========================================================
    // DELETE MRP
    // DELETE /api/mrp/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMrp(
            @PathVariable Long id
    ) {

        mrpService. deleteMrpById(id);

        return ResponseEntity.noContent().build();
    }

}
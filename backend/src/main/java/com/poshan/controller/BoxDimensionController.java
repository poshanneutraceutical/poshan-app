package com.poshan.controller;

import com.poshan.dto.BoxDimensionDTO;
import com.poshan.service.BoxDimensionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/box-dimensions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BoxDimensionController {

    private final BoxDimensionService boxDimensionService;

    /*
     ==========================================
     CREATE BOX
     ==========================================
     */
    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<BoxDimensionDTO> createBox(

            @RequestPart("box")
            BoxDimensionDTO dto,

            @RequestPart(
                    value = "image",
                    required = false
            )
            MultipartFile image

    ) {

        return ResponseEntity.ok(

                boxDimensionService.createBox(
                        dto,
                        image
                )

        );

    }

    /*
     ==========================================
     GET ALL BOXES
     ==========================================
     */
    @GetMapping
    public ResponseEntity<List<BoxDimensionDTO>> getAllBoxes() {

        return ResponseEntity.ok(

                boxDimensionService.getAllBoxes()

        );

    }

    /*
     ==========================================
     GET BOX BY ID
     ==========================================
     */

    @GetMapping ("/{id}")
    public ResponseEntity<BoxDimensionDTO> getBoxById(

            @PathVariable Long id

    ) {

        return ResponseEntity.ok(

                boxDimensionService.getBoxById(id)

        );

    }

    /*
     ==========================================
     UPDATE BOX
     ==========================================
     */

     @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<BoxDimensionDTO> updateBox(

            @PathVariable Long id,

            @RequestPart("box")
            BoxDimensionDTO dto,

            @RequestPart(
                    value = "image",
                    required = false
            )
            MultipartFile image

    ) {

        return ResponseEntity.ok(

                boxDimensionService.updateBox(
                        id,
                        dto,
                        image
                )

        );

    }

    /*
     ==========================================
     DELETE BOX
     ==========================================
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBox(

            @PathVariable Long id

    ) {

        return ResponseEntity.ok(

                boxDimensionService.deleteBox(id)

        );

    }

}
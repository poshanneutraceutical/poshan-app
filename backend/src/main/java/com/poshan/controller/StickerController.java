package com.poshan.controller;

import com.poshan.dto.StickerDTO;
import com.poshan.service.StickerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/stickers")
@RequiredArgsConstructor
public class StickerController {

    private final StickerService stickerService;

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<StickerDTO> createSticker(
            @RequestParam String weight,
            @RequestParam Integer stickerCount,
            @RequestParam(required = false) String note,
            @RequestParam("images") List<MultipartFile> images
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        stickerService.createSticker(
                                weight,
                                stickerCount,
                                note,
                                images
                        )
                );
    }

    @GetMapping
    public ResponseEntity<List<StickerDTO>> getAllStickers() {

        return ResponseEntity.ok(
                stickerService.getAllStickers()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<StickerDTO> getStickerById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                stickerService.getStickerById(id)
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSticker(
            @PathVariable Long id
    ) {

        stickerService.deleteSticker(id);

        return ResponseEntity.noContent().build();
    }

}

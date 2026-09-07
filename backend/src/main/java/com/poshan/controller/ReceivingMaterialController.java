package com.poshan.controller;

import com.poshan.dto.ReceivingMaterialDTO;
import com.poshan.dto.ReceivingMaterialPageDTO;
import com.poshan.service.ReceivingMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestPart;

import java.util.List;
@RestController
@RequestMapping("/api/procurement/receiving-material")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class ReceivingMaterialController {

    private final ReceivingMaterialService receivingMaterialService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ReceivingMaterialDTO createReceivingMaterial(

            @RequestPart("data")
            ReceivingMaterialDTO receivingMaterialDTO,

            @RequestPart(value = "images", required = false)
            List<MultipartFile> images

    ) {

        return receivingMaterialService.createReceivingMaterial(
                receivingMaterialDTO,
                images
        );

    }

    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ReceivingMaterialDTO updateReceivingMaterial(

            @PathVariable Long id,

            @RequestPart("data")
            ReceivingMaterialDTO receivingMaterialDTO,

            @RequestPart(value = "images", required = false)
            List<MultipartFile> images

    ) {

        return receivingMaterialService.updateReceivingMaterial(
                id,
                receivingMaterialDTO,
                images
        );

    }

    @GetMapping
    public List<ReceivingMaterialDTO> getAllReceivingMaterials() {

        return receivingMaterialService.getAllReceivingMaterials();
    }

    @GetMapping("/{id}")
    public ReceivingMaterialPageDTO getReceivingMaterialById(
            @PathVariable Long id) {

        return receivingMaterialService.getReceivingMaterialById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteReceivingMaterial(
            @PathVariable Long id) {

        receivingMaterialService.deleteReceivingMaterial(id);
    }

}
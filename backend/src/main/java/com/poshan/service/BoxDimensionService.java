package com.poshan.service;

import com.poshan.dto.BoxDimensionDTO;
import com.poshan.entity.BoxDimension;
import com.poshan.repository.BoxDimensionRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoxDimensionService {

    private final BoxDimensionRepository boxDimensionRepository;

    private final FileStorageService fileStorageService;


    /*
     ==========================================
     CREATE BOX
     ==========================================
     */

    public BoxDimensionDTO createBox(
            BoxDimensionDTO dto,
            MultipartFile image
    ) {

        BoxDimension box =
                new BoxDimension();


        /*
         * Generate Box Code
         */

        String boxCode =
                generateBoxCode();


        box.setBoxCode(
                boxCode
        );


        /*
         * Save Image
         */

        if (
                image != null &&
                        !image.isEmpty()
        ) {

            String imagePath =
                    fileStorageService.saveFile(
                            image,
                            "box-dimensions",
                            boxCode
                    );


            box.setBoxImage(
                    imagePath
            );
        }


        /*
         * Basic Information
         */

        box.setBoxType(
                dto.getBoxType()
        );


        /*
         * Main Dimensions
         */

        box.setHeight(
                dto.getHeight()
        );


        box.setWidth(
                dto.getWidth()
        );


        /*
         * Label Dimensions
         */

        box.setLabelHeight(
                dto.getLabelHeight()
        );


        box.setLabelWidth(
                dto.getLabelWidth()
        );


        /*
         * Neckseal Dimensions
         */

        box.setNecksealHeight(
                dto.getNecksealHeight()
        );


        box.setNecksealWidth(
                dto.getNecksealWidth()
        );


        /*
         * Other Dimensions
         */

        box.setCircumference(
                dto.getCircumference()
        );


        box.setCapHeight(
                dto.getCapHeight()
        );


        box.setCapCircumference(
                dto.getCapCircumference()
        );


        /*
         * Description
         */

        box.setDescription(
                dto.getDescription()
        );


        /*
         * Save
         */

        BoxDimension savedBox =
                boxDimensionRepository.save(
                        box
                );


        return mapToDTO(
                savedBox
        );

    }


    /*
     ==========================================
     GET BOX BY ID
     ==========================================
     */

    public BoxDimensionDTO getBoxById(
            Long id
    ) {

        BoxDimension box =
                boxDimensionRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Box Dimension not found."
                                        )
                        );


        return mapToDTO(
                box
        );

    }


    /*
     ==========================================
     GET ALL BOXES
     ==========================================
     */

    public List<BoxDimensionDTO> getAllBoxes() {

        return boxDimensionRepository
                .findAll()
                .stream()
                .map(
                        this::mapToDTO
                )
                .toList();

    }


    /*
     ==========================================
     UPDATE BOX
     ==========================================
     */

    public BoxDimensionDTO updateBox(
            Long id,
            BoxDimensionDTO dto,
            MultipartFile image
    ) {

        BoxDimension box =
                boxDimensionRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Box Dimension not found."
                                        )
                        );


        /*
         * Basic Information
         */

        box.setBoxType(
                dto.getBoxType()
        );


        /*
         * Main Dimensions
         */

        box.setHeight(
                dto.getHeight()
        );


        box.setWidth(
                dto.getWidth()
        );


        /*
         * Label Dimensions
         */

        box.setLabelHeight(
                dto.getLabelHeight()
        );


        box.setLabelWidth(
                dto.getLabelWidth()
        );


        /*
         * Neckseal Dimensions
         */

        box.setNecksealHeight(
                dto.getNecksealHeight()
        );


        box.setNecksealWidth(
                dto.getNecksealWidth()
        );


        /*
         * Other Dimensions
         */

        box.setCircumference(
                dto.getCircumference()
        );


        box.setCapHeight(
                dto.getCapHeight()
        );


        box.setCapCircumference(
                dto.getCapCircumference()
        );


        /*
         * Description
         */

        box.setDescription(
                dto.getDescription()
        );


        /*
         ==========================================
         UPDATE IMAGE
         ==========================================
         */

        if (
                image != null &&
                        !image.isEmpty()
        ) {

            /*
             * Delete old image
             */

            if (
                    box.getBoxImage() != null &&
                            !box.getBoxImage().isBlank()
            ) {

                fileStorageService.deleteFile(
                        box.getBoxImage()
                );

            }


            /*
             * Save new image
             */

            String imagePath =
                    fileStorageService.saveFile(
                            image,
                            "box-dimensions",
                            box.getBoxCode()
                    );


            box.setBoxImage(
                    imagePath
            );

        }


        /*
         * Save updated box
         */

        BoxDimension updatedBox =
                boxDimensionRepository.save(
                        box
                );


        return mapToDTO(
                updatedBox
        );

    }


    /*
     ==========================================
     DELETE BOX
     ==========================================
     */

    public String deleteBox(
            Long id
    ) {

        BoxDimension box =
                boxDimensionRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Box Dimension not found."
                                        )
                        );


        /*
         * Delete Image
         */

        if (
                box.getBoxImage() != null &&
                        !box.getBoxImage().isBlank()
        ) {

            fileStorageService.deleteFile(
                    box.getBoxImage()
            );

        }


        boxDimensionRepository.delete(
                box
        );


        return "Box Dimension deleted successfully.";

    }


    /*
     ==========================================
     MAP ENTITY -> DTO
     ==========================================
     */

    private BoxDimensionDTO mapToDTO(
            BoxDimension box
    ) {

        BoxDimensionDTO dto =
                new BoxDimensionDTO();


        /*
         * Basic Information
         */

        dto.setId(
                box.getId()
        );


        dto.setBoxCode(
                box.getBoxCode()
        );


        dto.setBoxType(
                box.getBoxType()
        );


        /*
         * Image
         */

        dto.setBoxImage(
                box.getBoxImage()
        );


        /*
         * Main Dimensions
         */

        dto.setHeight(
                box.getHeight()
        );


        dto.setWidth(
                box.getWidth()
        );


        /*
         * Label Dimensions
         */

        dto.setLabelHeight(
                box.getLabelHeight()
        );


        dto.setLabelWidth(
                box.getLabelWidth()
        );


        /*
         * Neckseal Dimensions
         */

        dto.setNecksealHeight(
                box.getNecksealHeight()
        );


        dto.setNecksealWidth(
                box.getNecksealWidth()
        );


        /*
         * Other Dimensions
         */

        dto.setCircumference(
                box.getCircumference()
        );


        dto.setCapHeight(
                box.getCapHeight()
        );


        dto.setCapCircumference(
                box.getCapCircumference()
        );


        /*
         * Description
         */

        dto.setDescription(
                box.getDescription()
        );


        return dto;

    }


    /*
     ==========================================
     GENERATE BOX CODE
     ==========================================
     */

    private String generateBoxCode() {

        BoxDimension lastBox =
                boxDimensionRepository
                        .findTopByOrderByIdDesc();


        if (
                lastBox == null
        ) {

            return "BOX-000001";

        }


        return String.format(
                "BOX-%06d",
                lastBox.getId() + 1
        );

    }

}
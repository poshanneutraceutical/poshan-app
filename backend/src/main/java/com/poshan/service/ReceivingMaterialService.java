package com.poshan.service;

import com.poshan.dto.ReceivingMaterialDTO;
import com.poshan.dto.ReceivingMaterialItemDTO;
import com.poshan.dto.ReceivingMaterialPageDTO;
import com.poshan.entity.BoxType;
import com.poshan.entity.ReceivingMaterial;
import com.poshan.entity.ReceivingMaterialItem;
import com.poshan.repository.ReceivingMaterialItemRepository;
import com.poshan.repository.ReceivingMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReceivingMaterialService {


    private final ReceivingMaterialRepository
            receivingMaterialRepository;


    private final ReceivingMaterialItemRepository
            receivingMaterialItemRepository;


    private final InventoryService
            inventoryService;


    private final FileStorageService
            fileStorageService;


    /*
     =========================================================
     CREATE RECEIVING MATERIAL
     =========================================================
     */

    public ReceivingMaterialDTO createReceivingMaterial(
            ReceivingMaterialDTO receivingMaterialDTO,
            List<MultipartFile> images
    ) {

        ReceivingMaterial material =
                new ReceivingMaterial();


        material.setReceiverName(
                receivingMaterialDTO
                        .getReceiverName()
        );


        material.setSupplierName(
                receivingMaterialDTO
                        .getSupplierName()
        );


        material.setBillNumber(
                receivingMaterialDTO
                        .getBillNumber()
        );


        List<String> uploadedPhotos =
                new ArrayList<>();


        if (
                images != null &&
                        !images.isEmpty()
        ) {

            for (
                    MultipartFile image
                    : images
            ) {

                String imagePath =
                        fileStorageService.saveFile(
                                image,
                                "receiving-material",
                                "RM_" +
                                        System.currentTimeMillis() +
                                        "_" +
                                        UUID.randomUUID()
                        );


                uploadedPhotos.add(
                        imagePath
                );
            }
        }


        material.setMaterialPhotos(
                uploadedPhotos
        );


        material.setReceivedDate(
                receivingMaterialDTO
                        .getReceivedDate()
        );


        material.setCreatedAt(
                LocalDateTime.now()
        );


        material.setRemarks(
                receivingMaterialDTO
                        .getRemarks()
        );


        ReceivingMaterial savedMaterial =
                receivingMaterialRepository.save(
                        material
                );


        if (
                receivingMaterialDTO
                        .getReceivingMaterialItems() != null
        ) {

            for (
                    ReceivingMaterialItemDTO itemDTO
                    : receivingMaterialDTO
                    .getReceivingMaterialItems()
            ) {

                ReceivingMaterialItem item =
                        new ReceivingMaterialItem();


                item.setReceivingMaterial(
                        savedMaterial
                );


                item.setBoxType(
                        itemDTO.getBoxType()
                );


                item.setMaterialQuantity(
                        itemDTO.getMaterialQuantity()
                );


                receivingMaterialItemRepository.save(
                        item
                );


                inventoryService.increaseInventory(
                        item.getBoxType(),
                        item.getMaterialQuantity()
                );
            }
        }


        return mapToDTO(
                savedMaterial
        );
    }


    /*
     =========================================================
     UPDATE RECEIVING MATERIAL

     Inventory is adjusted by the NET DIFFERENCE.

     Example:

     Old = 502
     New = 502
     Difference = 0

     Old = 502
     New = 550
     Difference = +48

     Old = 502
     New = 450
     Difference = -52
     =========================================================
     */

    @Transactional
    public ReceivingMaterialDTO updateReceivingMaterial(
            Long id,
            ReceivingMaterialDTO receivingMaterialDTO,
            List<MultipartFile> images
    ) {

        ReceivingMaterial material =
                receivingMaterialRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Receiving Material not found"
                                        )
                        );


        /*
         =====================================================
         UPDATE MAIN RECEIVING MATERIAL FIELDS
         =====================================================
         */

        material.setReceiverName(
                receivingMaterialDTO
                        .getReceiverName()
        );


        material.setSupplierName(
                receivingMaterialDTO
                        .getSupplierName()
        );


        material.setBillNumber(
                receivingMaterialDTO
                        .getBillNumber()
        );


        /*
         =====================================================
         UPDATE IMAGES ONLY WHEN NEW IMAGES ARE PROVIDED
         =====================================================
         */

        if (
                images != null &&
                        !images.isEmpty()
        ) {

            List<String> uploadedPhotos =
                    new ArrayList<>();


            for (
                    MultipartFile image
                    : images
            ) {

                String imagePath =
                        fileStorageService.saveFile(
                                image,
                                "receiving-material",
                                "RM_" +
                                        System.currentTimeMillis() +
                                        "_" +
                                        UUID.randomUUID()
                        );


                uploadedPhotos.add(
                        imagePath
                );
            }


            material.setMaterialPhotos(
                    uploadedPhotos
            );
        }


        material.setReceivedDate(
                receivingMaterialDTO
                        .getReceivedDate()
        );


        material.setRemarks(
                receivingMaterialDTO
                        .getRemarks()
        );


        ReceivingMaterial savedMaterial =
                receivingMaterialRepository.save(
                        material
                );


        /*
         =====================================================
         LOAD OLD ITEMS
         =====================================================
         */

        List<ReceivingMaterialItem> oldItems =
                receivingMaterialItemRepository
                        .findByReceivingMaterial(
                                savedMaterial
                        );


        /*
         =====================================================
         OLD INVENTORY TOTALS
         =====================================================
         */

        Map<BoxType, Integer> oldTotals =
                new HashMap<>();


        for (
                ReceivingMaterialItem oldItem
                : oldItems
        ) {

            BoxType boxType =
                    oldItem.getBoxType();


            Integer quantity =
                    oldItem.getMaterialQuantity();


            if (
                    boxType == null
            ) {

                throw new RuntimeException(
                        "Box Type is missing in existing receiving material item."
                );
            }


            if (
                    quantity == null ||
                            quantity <= 0
            ) {

                throw new RuntimeException(
                        "Invalid quantity in existing receiving material item."
                );
            }


            oldTotals.merge(
                    boxType,
                    quantity,
                    Integer::sum
            );
        }


        /*
         =====================================================
         NEW INVENTORY TOTALS
         =====================================================
         */

        Map<BoxType, Integer> newTotals =
                new HashMap<>();


        if (
                receivingMaterialDTO
                        .getReceivingMaterialItems() != null
        ) {

            for (
                    ReceivingMaterialItemDTO itemDTO
                    : receivingMaterialDTO
                    .getReceivingMaterialItems()
            ) {

                BoxType boxType =
                        itemDTO.getBoxType();


                Integer quantity =
                        itemDTO.getMaterialQuantity();


                if (
                        boxType == null
                ) {

                    throw new RuntimeException(
                            "Box Type is required."
                    );
                }


                if (
                        quantity == null ||
                                quantity <= 0
                ) {

                    throw new RuntimeException(
                            "Material quantity must be greater than 0."
                    );
                }


                newTotals.merge(
                        boxType,
                        quantity,
                        Integer::sum
                );
            }
        }


        /*
         =====================================================
         FIND ALL AFFECTED BOX TYPES
         =====================================================
         */

        EnumSet<BoxType> affectedBoxTypes =
                EnumSet.noneOf(
                        BoxType.class
                );


        affectedBoxTypes.addAll(
                oldTotals.keySet()
        );


        affectedBoxTypes.addAll(
                newTotals.keySet()
        );


        /*
         =====================================================
         APPLY ONLY THE NET INVENTORY DIFFERENCE
         =====================================================
         */

        for (
                BoxType boxType
                : affectedBoxTypes
        ) {

            int oldQuantity =
                    oldTotals.getOrDefault(
                            boxType,
                            0
                    );


            int newQuantity =
                    newTotals.getOrDefault(
                            boxType,
                            0
                    );


            int difference =
                    newQuantity -
                            oldQuantity;


            /*
             * New receiving quantity is greater.
             * Add only the extra quantity.
             */

            if (
                    difference > 0
            ) {

                inventoryService.increaseInventory(
                        boxType,
                        difference
                );
            }


            /*
             * New receiving quantity is smaller.
             * Remove only the reduced quantity.
             */

            else if (
                    difference < 0
            ) {

                inventoryService.decreaseInventory(
                        boxType,
                        Math.abs(
                                difference
                        )
                );
            }

            /*
             * difference == 0
             * No inventory operation needed.
             */
        }


        /*
         =====================================================
         DELETE OLD ITEMS
         =====================================================
         */

        receivingMaterialItemRepository.deleteAll(
                oldItems
        );


        /*
         =====================================================
         SAVE NEW ITEMS
         =====================================================
         */

        if (
                receivingMaterialDTO
                        .getReceivingMaterialItems() != null
        ) {

            for (
                    ReceivingMaterialItemDTO itemDTO
                    : receivingMaterialDTO
                    .getReceivingMaterialItems()
            ) {

                ReceivingMaterialItem item =
                        new ReceivingMaterialItem();


                item.setReceivingMaterial(
                        savedMaterial
                );


                item.setBoxType(
                        itemDTO.getBoxType()
                );


                item.setMaterialQuantity(
                        itemDTO.getMaterialQuantity()
                );


                receivingMaterialItemRepository.save(
                        item
                );
            }
        }


        /*
         =====================================================
         RETURN UPDATED DATA
         =====================================================
         */

        return mapToDTO(
                savedMaterial
        );
    }


    /*
     =========================================================
     GET ALL RECEIVING MATERIALS
     =========================================================
     */

    public List<ReceivingMaterialDTO>
    getAllReceivingMaterials() {

        return receivingMaterialRepository
                .findAll()
                .stream()
                .map(
                        this::mapToDTO
                )
                .toList();
    }


    /*
     =========================================================
     GET RECEIVING MATERIAL BY ID
     =========================================================
     */

    public ReceivingMaterialPageDTO
    getReceivingMaterialById(
            Long id
    ) {

        ReceivingMaterial material =
                receivingMaterialRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Receiving Material not found"
                                        )
                        );


        return mapToPageDTO(
                material
        );
    }


    /*
     =========================================================
     DELETE RECEIVING MATERIAL
     =========================================================
     */

    public void deleteReceivingMaterial(
            Long id
    ) {

        ReceivingMaterial material =
                receivingMaterialRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Receiving Material not found"
                                        )
                        );


        List<ReceivingMaterialItem> items =
                receivingMaterialItemRepository
                        .findByReceivingMaterial(
                                material
                        );


        /*
         * Deleting a receiving record removes its
         * contribution from inventory.
         */

        for (
                ReceivingMaterialItem item
                : items
        ) {

            inventoryService.decreaseInventory(
                    item.getBoxType(),
                    item.getMaterialQuantity()
            );
        }


        receivingMaterialRepository.delete(
                material
        );
    }


    /*
     =========================================================
     ENTITY -> DTO
     =========================================================
     */

    private ReceivingMaterialDTO
    mapToDTO(
            ReceivingMaterial material
    ) {

        ReceivingMaterialDTO dto =
                new ReceivingMaterialDTO();


        dto.setId(
                material.getId()
        );


        dto.setReceiverName(
                material.getReceiverName()
        );


        dto.setSupplierName(
                material.getSupplierName()
        );


        dto.setBillNumber(
                material.getBillNumber()
        );


        dto.setMaterialPhotos(
                material.getMaterialPhotos()
        );


        dto.setReceivedDate(
                material.getReceivedDate()
        );


        dto.setCreatedAt(
                material.getCreatedAt()
        );


        dto.setRemarks(
                material.getRemarks()
        );


        List<ReceivingMaterialItem> items =
                receivingMaterialItemRepository
                        .findByReceivingMaterial(
                                material
                        );


        List<ReceivingMaterialItemDTO>
                itemDTOList =
                items.stream()
                        .map(
                                this::mapItemToDTO
                        )
                        .toList();


        dto.setReceivingMaterialItems(
                itemDTOList
        );


        return dto;
    }


    /*
     =========================================================
     ITEM -> DTO
     =========================================================
     */

    private ReceivingMaterialItemDTO
    mapItemToDTO(
            ReceivingMaterialItem item
    ) {

        ReceivingMaterialItemDTO dto =
                new ReceivingMaterialItemDTO();


        dto.setId(
                item.getId()
        );


        dto.setBoxType(
                item.getBoxType()
        );


        dto.setMaterialQuantity(
                item.getMaterialQuantity()
        );


        return dto;
    }


    /*
     =========================================================
     ENTITY -> PAGE DTO
     =========================================================
     */

    private ReceivingMaterialPageDTO
    mapToPageDTO(
            ReceivingMaterial material
    ) {

        ReceivingMaterialPageDTO dto =
                new ReceivingMaterialPageDTO();


        dto.setId(
                material.getId()
        );


        dto.setReceiverName(
                material.getReceiverName()
        );


        dto.setSupplierName(
                material.getSupplierName()
        );


        dto.setBillNumber(
                material.getBillNumber()
        );


        dto.setMaterialPhotos(
                material.getMaterialPhotos()
        );


        dto.setReceivedDate(
                material.getReceivedDate()
        );


        dto.setCreatedAt(
                material.getCreatedAt()
        );


        dto.setRemarks(
                material.getRemarks()
        );


        List<ReceivingMaterialItem> items =
                receivingMaterialItemRepository
                        .findByReceivingMaterial(
                                material
                        );


        List<ReceivingMaterialItemDTO>
                itemDTOList =
                items.stream()
                        .map(
                                this::mapItemToDTO
                        )
                        .toList();


        dto.setReceivingMaterialItems(
                itemDTOList
        );


        return dto;
    }

}
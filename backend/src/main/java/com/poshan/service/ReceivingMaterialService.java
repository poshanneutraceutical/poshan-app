package com.poshan.service;

import com.poshan.dto.ReceivingMaterialDTO;
import com.poshan.dto.ReceivingMaterialItemDTO;
import com.poshan.dto.ReceivingMaterialPageDTO;
import com.poshan.entity.ReceivingMaterial;
import com.poshan.entity.ReceivingMaterialItem;
import com.poshan.repository.ReceivingMaterialItemRepository;
import com.poshan.repository.ReceivingMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.UUID;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceivingMaterialService {

    private final ReceivingMaterialRepository receivingMaterialRepository;
    private final ReceivingMaterialItemRepository receivingMaterialItemRepository;
    private final InventoryService inventoryService;
    private final FileStorageService fileStorageService;

    public ReceivingMaterialDTO createReceivingMaterial(
            ReceivingMaterialDTO receivingMaterialDTO,
            List<MultipartFile> images) {

        ReceivingMaterial material = new ReceivingMaterial();

        material.setReceiverName(receivingMaterialDTO.getReceiverName());
        material.setSupplierName(receivingMaterialDTO.getSupplierName());
        material.setBillNumber(receivingMaterialDTO.getBillNumber());

        List<String> uploadedPhotos = new ArrayList<>();

        if (images != null && !images.isEmpty()) {

            for (MultipartFile image : images) {

                String imagePath = fileStorageService.saveFile(

                        image,

                        "receiving-material",

                        "RM_" + System.currentTimeMillis() + "_" + UUID.randomUUID()

                );

                uploadedPhotos.add(imagePath);

            }

        }

        material.setMaterialPhotos(uploadedPhotos);
        material.setReceivedDate(receivingMaterialDTO.getReceivedDate());
        material.setCreatedAt(LocalDateTime.now());
        material.setRemarks(receivingMaterialDTO.getRemarks());

        ReceivingMaterial savedMaterial = receivingMaterialRepository.save(material);

        if (receivingMaterialDTO.getReceivingMaterialItems() != null) {

            for (ReceivingMaterialItemDTO itemDTO : receivingMaterialDTO.getReceivingMaterialItems()) {

                ReceivingMaterialItem item = new ReceivingMaterialItem();

                item.setReceivingMaterial(savedMaterial);
                item.setBoxType(itemDTO.getBoxType());
                item.setMaterialQuantity(itemDTO.getMaterialQuantity());

                receivingMaterialItemRepository.save(item);

                inventoryService.increaseInventory(
                        item.getBoxType(),
                        item.getMaterialQuantity()
                );
            }
        }

        return mapToDTO(savedMaterial);
    }
    public ReceivingMaterialDTO updateReceivingMaterial(
            Long id,
            ReceivingMaterialDTO receivingMaterialDTO,
            List<MultipartFile> images) {

        ReceivingMaterial material = receivingMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receiving Material not found"));

        material.setReceiverName(receivingMaterialDTO.getReceiverName());
        material.setSupplierName(receivingMaterialDTO.getSupplierName());
        material.setBillNumber(receivingMaterialDTO.getBillNumber());

        if (images != null && !images.isEmpty()) {

            List<String> uploadedPhotos = new ArrayList<>();

            for (MultipartFile image : images) {

                String imagePath = fileStorageService.saveFile(

                        image,

                        "receiving-material",

                        "RM_" + System.currentTimeMillis() + "_" + UUID.randomUUID()

                );

                uploadedPhotos.add(imagePath);

            }

            material.setMaterialPhotos(uploadedPhotos);

        }
        material.setReceivedDate(receivingMaterialDTO.getReceivedDate());
        material.setRemarks(receivingMaterialDTO.getRemarks());

        ReceivingMaterial savedMaterial = receivingMaterialRepository.save(material);

        List<ReceivingMaterialItem> oldItems =
                receivingMaterialItemRepository.findByReceivingMaterial(savedMaterial);

        // Remove old quantities from inventory
        for (ReceivingMaterialItem oldItem : oldItems) {

            inventoryService.decreaseInventory(
                    oldItem.getBoxType(),
                    oldItem.getMaterialQuantity()
            );
        }

        // Delete old items
        receivingMaterialItemRepository.deleteAll(oldItems);

        // Save new items and add them to inventory
        if (receivingMaterialDTO.getReceivingMaterialItems() != null) {

            for (ReceivingMaterialItemDTO itemDTO : receivingMaterialDTO.getReceivingMaterialItems()) {

                ReceivingMaterialItem item = new ReceivingMaterialItem();

                item.setReceivingMaterial(savedMaterial);
                item.setBoxType(itemDTO.getBoxType());
                item.setMaterialQuantity(itemDTO.getMaterialQuantity());

                receivingMaterialItemRepository.save(item);

                inventoryService.increaseInventory(
                        item.getBoxType(),
                        item.getMaterialQuantity()
                );
            }
        }

        return mapToDTO(savedMaterial);
    }


    public List<ReceivingMaterialDTO> getAllReceivingMaterials() {

        return receivingMaterialRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    public ReceivingMaterialPageDTO getReceivingMaterialById(Long id) {

        ReceivingMaterial material = receivingMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receiving Material not found"));

        return mapToPageDTO(material);
    }


    public void deleteReceivingMaterial(Long id) {

        ReceivingMaterial material = receivingMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receiving Material not found"));

        List<ReceivingMaterialItem> items =
                receivingMaterialItemRepository.findByReceivingMaterial(material);

        // Remove quantities from inventory
        for (ReceivingMaterialItem item : items) {

            inventoryService.decreaseInventory(
                    item.getBoxType(),
                    item.getMaterialQuantity()
            );
        }

        receivingMaterialRepository.delete(material);
    }
    private ReceivingMaterialDTO mapToDTO(ReceivingMaterial material) {

        ReceivingMaterialDTO dto = new ReceivingMaterialDTO();

        dto.setId(material.getId());
        dto.setReceiverName(material.getReceiverName());
        dto.setSupplierName(material.getSupplierName());
        dto.setBillNumber(material.getBillNumber());

        dto.setMaterialPhotos(material.getMaterialPhotos());
        dto.setReceivedDate(material.getReceivedDate());
        dto.setCreatedAt(material.getCreatedAt());
        dto.setRemarks(material.getRemarks());

        List<ReceivingMaterialItem> items =
                receivingMaterialItemRepository.findByReceivingMaterial(material);

        List<ReceivingMaterialItemDTO> itemDTOList = items.stream()
                .map(this::mapItemToDTO)
                .toList();

        dto.setReceivingMaterialItems(itemDTOList);

        return dto;
    }


    private ReceivingMaterialItemDTO mapItemToDTO(ReceivingMaterialItem item) {

        ReceivingMaterialItemDTO dto = new ReceivingMaterialItemDTO();

        dto.setId(item.getId());
        dto.setBoxType(item.getBoxType());
        dto.setMaterialQuantity(item.getMaterialQuantity());

        return dto;
    }


    private ReceivingMaterialPageDTO mapToPageDTO(ReceivingMaterial material) {

        ReceivingMaterialPageDTO dto = new ReceivingMaterialPageDTO();

        dto.setId(material.getId());
        dto.setReceiverName(material.getReceiverName());
        dto.setSupplierName(material.getSupplierName());
        dto.setBillNumber(material.getBillNumber());

        dto.setMaterialPhotos(material.getMaterialPhotos());
        dto.setReceivedDate(material.getReceivedDate());
        dto.setCreatedAt(material.getCreatedAt());
        dto.setRemarks(material.getRemarks());

        List<ReceivingMaterialItem> items =
                receivingMaterialItemRepository.findByReceivingMaterial(material);

        List<ReceivingMaterialItemDTO> itemDTOList = items.stream()
                .map(this::mapItemToDTO)
                .toList();

        dto.setReceivingMaterialItems(itemDTOList);

        return dto;
    }

}
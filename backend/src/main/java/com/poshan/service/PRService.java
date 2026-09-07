package com.poshan.service;

import com.poshan.dto.PR_ItemDTO;
import com.poshan.dto.PR_PageDTO;
import com.poshan.dto.PR_DTO;
import com.poshan.entity.*;
import com.poshan.repository.PRItemRepository;
import com.poshan.repository.PRRepository;
import com.poshan.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PRService {


    private final PRRepository prRepository;

    private final PRItemRepository prItemRepository;

    private final VendorRepository vendorRepository;



    public PR_DTO createPR(PR_DTO prDTO) {


        Vendor vendor = vendorRepository.findById(prDTO.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));



        PR pr = new PR();


        pr.setPrNumber(generatePRNumber());

        pr.setVendor(vendor);

        pr.setRequestedBy(prDTO.getRequestedBy());

        pr.setDepartment(prDTO.getDepartment());

        pr.setPriority(prDTO.getPriority());

        pr.setRemarks(prDTO.getRemarks());

        pr.setStatus(PRstatus.Pending);

        pr.setCreatedAt(LocalDateTime.now());



        PR savedPR = prRepository.save(pr);



        if (prDTO.getItems() != null) {


            for (PR_ItemDTO itemDTO : prDTO.getItems()) {


                PR_Item item = new PR_Item();


                item.setPr(savedPR);

                item.setBoxType(itemDTO.getBoxType());

                item.setQuantity(itemDTO.getQuantity());


                prItemRepository.save(item);
            }
        }


        return mapToDTO(savedPR);
    }



    private String generatePRNumber() {


        long count = prRepository.count() + 1;


        return "PR-2026-" + String.format("%03d", count);

    }
    public PR_DTO updatePR(Long id, PR_DTO prDTO) {


        PR pr = prRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PR not found"));


        Vendor vendor = vendorRepository.findById(prDTO.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));



        pr.setVendor(vendor);

        pr.setRequestedBy(prDTO.getRequestedBy());

        pr.setDepartment(prDTO.getDepartment());

        pr.setPriority(prDTO.getPriority());

        pr.setRemarks(prDTO.getRemarks());


        PR savedPR = prRepository.save(pr);



        // Remove old items while updating PR

        List<PR_Item> oldItems =
                prItemRepository.findByPr(savedPR);


        prItemRepository.deleteAll(oldItems);



        // Save updated items

        if (prDTO.getItems() != null) {


            for (PR_ItemDTO itemDTO : prDTO.getItems()) {


                PR_Item item = new PR_Item();


                item.setPr(savedPR);

                item.setBoxType(itemDTO.getBoxType());

                item.setQuantity(itemDTO.getQuantity());


                prItemRepository.save(item);

            }

        }


        return mapToDTO(savedPR);

    }




    public List<PR_DTO> getAllPR() {


        return prRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();

    }




    public PR_PageDTO getPRById(Long id) {


        PR pr = prRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PR not found"));


        return mapToPageDTO(pr);

    }




    public List<PR_PageDTO> getAllPRPageData() {


        return prRepository.findAll()
                .stream()
                .map(this::mapToPageDTO)
                .toList();

    }




    public void deletePR(Long id) {


        PR pr = prRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PR not found"));


        prRepository.delete(pr);

    }
    private PR_DTO mapToDTO(PR pr) {


        PR_DTO dto = new PR_DTO();


        dto.setId(pr.getId());

        dto.setPrNumber(pr.getPrNumber());

        dto.setVendorId(pr.getVendor().getId());

        dto.setRequestedBy(pr.getRequestedBy());

        dto.setDepartment(pr.getDepartment());

        dto.setPriority(pr.getPriority());

        dto.setRemarks(pr.getRemarks());

        dto.setStatus(pr.getStatus());

        dto.setCreatedAt(pr.getCreatedAt());



        List<PR_ItemDTO> itemDTOList =
                prItemRepository.findByPr(pr)
                        .stream()
                        .map(this::mapItemToDTO)
                        .toList();


        dto.setItems(itemDTOList);



        return dto;

    }





    private PR_ItemDTO mapItemToDTO(PR_Item item) {


        PR_ItemDTO dto = new PR_ItemDTO();


        dto.setId(item.getId());

        dto.setBoxType(item.getBoxType());

        dto.setQuantity(item.getQuantity());


        return dto;

    }





    private PR_PageDTO mapToPageDTO(PR pr) {


        PR_PageDTO dto = new PR_PageDTO();



        dto.setId(pr.getId());

        dto.setPrNumber(pr.getPrNumber());



        // Vendor details

        dto.setVendorId(pr.getVendor().getId());

        dto.setVendorName(
                pr.getVendor().getVendorName()
        );

        dto.setVendorCompanyName(
                pr.getVendor().getVendorCompanyName()
        );

        dto.setVendorContactNumber(
                pr.getVendor().getContactNumber()
        );



        dto.setRequestedBy(pr.getRequestedBy());

        dto.setDepartment(pr.getDepartment());

        dto.setPriority(pr.getPriority());

        dto.setRemarks(pr.getRemarks());

        dto.setStatus(pr.getStatus());

        dto.setCreatedAt(pr.getCreatedAt());



        List<PR_ItemDTO> itemDTOList =
                prItemRepository.findByPr(pr)
                        .stream()
                        .map(this::mapItemToDTO)
                        .toList();



        dto.setItems(itemDTOList);



        // Approval details will be added later

        dto.setApprovedBy(null);

        dto.setApprovedDate(null);

        dto.setApprovalRemarks(null);



        return dto;

    }

}
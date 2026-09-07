package com.poshan.service;


import com.poshan.dto.VendorDTO;
import com.poshan.dto.VendorPageDTO;
import com.poshan.entity.Vendor;
import com.poshan.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorService {

    private  final VendorRepository vendorRepository;

    public VendorDTO createvendor(VendorDTO vendorDTO){

        Vendor vendor = new Vendor();
        vendor.setVendorName(vendorDTO.getVendorName());
        vendor.setVendorEmail(vendorDTO.getVendorEmail());
        vendor.setWhatsappNumber(vendorDTO.getWhatsappNumber());
        vendor.setContactNumber(vendorDTO.getContactNumber());
        vendor.setCategory(vendorDTO.getCategory());
        vendor.setCreatedAt(LocalDateTime.now());
        vendor.setVendorCompanyName(vendorDTO.getVendorCompanyName());
        Vendor savedvendor = vendorRepository.save(vendor);
        return mapToDTO(savedvendor);

    }
    public VendorDTO updateVendor(Long id, VendorDTO vendorDTO) {

        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        vendor.setVendorName(vendorDTO.getVendorName());
        vendor.setVendorEmail(vendorDTO.getVendorEmail());
        vendor.setVendorCompanyName(vendorDTO.getVendorCompanyName());
        vendor.setContactNumber(vendorDTO.getContactNumber());
        vendor.setWhatsappNumber(vendorDTO.getWhatsappNumber());
        vendor.setCategory(vendorDTO.getCategory());
        vendor.setAddress(vendorDTO.getAddress());

        Vendor savedVendor = vendorRepository.save(vendor);

        return mapToDTO(savedVendor);
    }

    public List<VendorDTO> getAllVendors() {

        return vendorRepository.findAll()
                .stream()
                .map(vendor ->mapToDTO(vendor))
                .toList();
    }
    public VendorPageDTO getVendorById(Long id) {

        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        return mapToPageDTO(vendor);
    }


    public void deleteVendor(Long id) {

        if (!vendorRepository.existsById(id)) {
            throw new RuntimeException("Vendor not found");
        }

        vendorRepository.deleteById(id);
    }


    private VendorDTO mapToDTO(Vendor vendor) {

        VendorDTO dto = new VendorDTO();

        dto.setId(vendor.getId());
        dto.setVendorName(vendor.getVendorName());
        dto.setVendorEmail(vendor.getVendorEmail());
        dto.setVendorCompanyName(vendor.getVendorCompanyName());
        dto.setContactNumber(vendor.getContactNumber());
        dto.setWhatsappNumber(vendor.getWhatsappNumber());
        dto.setCategory(vendor.getCategory());
        dto.setAddress(vendor.getAddress());
        dto.setCreatedAt(vendor.getCreatedAt());

        return dto;
    }


    private VendorPageDTO mapToPageDTO(Vendor vendor) {

        VendorPageDTO dto = new VendorPageDTO();

        dto.setId(vendor.getId());
        dto.setVendorName(vendor.getVendorName());
        dto.setVendorEmail(vendor.getVendorEmail());
        dto.setVendorCompanyName(vendor.getVendorCompanyName());
        dto.setContactNumber(vendor.getContactNumber());
        dto.setWhatsappNumber(vendor.getWhatsappNumber());
        dto.setCategory(vendor.getCategory());
        dto.setAddress(vendor.getAddress());
        dto.setCreatedAt(vendor.getCreatedAt());


        dto.setTotalPurchaseRequisitions(0L);
        dto.setPendingPurchaseRequisitions(0L);
        dto.setApprovedPurchaseRequisitions(0L);
        dto.setLastPurchaseRequisitionDate(null);

        return dto;
    }
}

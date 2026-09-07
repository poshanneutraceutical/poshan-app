package com.poshan.controller;

import com.poshan.dto.VendorDTO;
import com.poshan.dto.VendorPageDTO;
import com.poshan.service.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/procurement/vendors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class VendorController {

    private final VendorService vendorService;


    @PostMapping
    public VendorDTO createVendor(@RequestBody VendorDTO vendorDTO) {

        return vendorService.createvendor(vendorDTO);
    }


    @PutMapping("/{id}")
    public VendorDTO updateVendor(
            @PathVariable Long id,
            @RequestBody VendorDTO vendorDTO) {

        return vendorService.updateVendor(id, vendorDTO);
    }


    @GetMapping
    public List<VendorDTO> getAllVendors() {

        return vendorService.getAllVendors();
    }


    @GetMapping("/{id}")
    public VendorPageDTO getVendorById(@PathVariable Long id) {

        return vendorService.getVendorById(id);
    }


    @DeleteMapping("/{id}")
    public void deleteVendor(@PathVariable Long id) {

        vendorService.deleteVendor(id);
    }

}
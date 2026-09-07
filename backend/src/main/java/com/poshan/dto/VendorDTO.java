package com.poshan.dto;


import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data

public class VendorDTO {

    private Long id;

    private String vendorName;

    private String contactNumber;

    private String vendorEmail;
    private String whatsappNumber;

    private String category;

    private String address;

    private String vendorCompanyName;

    private LocalDateTime createdAt;

}

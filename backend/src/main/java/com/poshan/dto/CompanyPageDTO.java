package com.poshan.dto;

import lombok.Data;

import java.util.List;

@Data
public class CompanyPageDTO {

    private Long companyId;

    private String companyName;

    /*
     ==========================================
     COMPANY DETAIL ID
     ==========================================
     */

    private Long companyDetailId;

    private String orderName;

    private String orderType;

    private Integer quantity;

    private String companyLocation;

    /*
     ==========================================
     CUSTOM FIELDS
     ==========================================
     */

    private List<CustomFieldDTO> customFields;

}
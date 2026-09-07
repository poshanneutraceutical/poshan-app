package com.poshan.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompanyDetailDTO {

    private Long id;

    private Long companyid;

    private String ordername;

    private String ordertype;

    private Integer quantity;

    private String companylocation;

}
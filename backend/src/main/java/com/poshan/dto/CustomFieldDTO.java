package com.poshan.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CustomFieldDTO {

    private Long id;

    private Long companyid;

    private String fieldname;

    private String fieldvalue;

}
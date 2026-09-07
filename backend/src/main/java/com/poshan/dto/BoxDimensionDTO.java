package com.poshan.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoxDimensionDTO {

    /*
     ==========================================
     BASIC INFORMATION
     ==========================================
     */

    private Long id;

    private String boxCode;

    private String boxType;

    /*
     ==========================================
     IMAGE
     ==========================================
     */

    private String boxImage;

    /*
     ==========================================
     DIMENSIONS
     ==========================================
     */

    private Double height;

    private Double width;

    private Double labelHeight;

    private Double labelWidth;
    private Double necksealHeight;

    private Double necksealWidth;

    private Double circumference;

    private Double capHeight;

    private Double capCircumference;

    /*
     ==========================================
     DESCRIPTION
     ==========================================
     */

    private String description;

}
package com.poshan.dto;

import com.poshan.entity.Taskstatus;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductionDTO {

    private Long id;

    private String plandate;

    private String tittle;

    private String description;

    private String assignby;

    private LocalDateTime executedate;

    private Taskstatus status;

    private String scoope;


    /*
     * Existing compatibility field.
     */
    private String boxtype;


    /*
     * New raw material reference.
     */
    private Long materialId;

    private String materialName;

    private String materialType;


    private String weight;

    private String neckseal;

    private String companyname;

    private String necksealtype;
}
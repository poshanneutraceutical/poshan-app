package com.poshan.dto;

import lombok.Data;

@Data
public class MRPDTO {

    private Long id;

    private String  mrp;

    private String batchNumber;

    private String mfgDate;

    private String expDate;

    private String companyName;

    private String scopeType;

    private String boxType;

    private String neckSealType;

    private String note;

}

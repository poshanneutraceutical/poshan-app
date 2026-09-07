package com.poshan.dto;

import com.poshan.entity.BoxType;
import lombok.Data;

@Data
public class PR_ItemDTO {

    private Long id;

    private BoxType boxType;

    private Integer quantity;

}
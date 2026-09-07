package com.poshan.dto;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OpeningDTO {


    private Long id;
    private String jobtittle;
    private String department;
    private String position;
    private LocalDateTime posteddate;
    private LocalDateTime closingdate;
    private String salaryrange;
    private String description;
}

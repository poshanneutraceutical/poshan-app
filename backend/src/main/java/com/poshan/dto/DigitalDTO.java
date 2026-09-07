package com.poshan.dto;

import com.poshan.entity.Projectstatus;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class DigitalDTO {


    private Long id;

    private String projectname;
    private String companyname;
    private String type;
    private Projectstatus status;
    private String assignto;
    private LocalDateTime assigndate;
    private LocalDateTime duedate;
    private Long leadgenerated;
    private String notes;
}

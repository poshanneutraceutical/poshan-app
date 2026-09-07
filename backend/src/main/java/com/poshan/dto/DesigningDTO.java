package com.poshan.dto;

import com.poshan.entity.Taskstatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDateTime;

@Data

public class DesigningDTO {

    private Long id;
    private String projectname;
    private String companyname;
    private String designtype;
    private Taskstatus status;
    private String assignby;
    private String assignto;
    private LocalDateTime assigndate;
    private LocalDateTime duedate;
    private String notes;



}

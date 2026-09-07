package com.poshan.dto;

import com.poshan.entity.Projectstatus;
import com.poshan.entity.preority;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jdk.jfr.Category;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class WebDevelopmentDTO {

    private Long id;
    @NotBlank(message = "company name is required")
    private String companyname;

    private String contactperson;
    @NotBlank(message = "Project name  is required")
    private String projectname;

    private String  projecttype;

    private Projectstatus status = Projectstatus.HOLD;


    private preority priority = preority.LOW;

    private String assigndeveloper;

    private String notes;

    private LocalDateTime assigndate;

    private LocalDateTime duedate;





}

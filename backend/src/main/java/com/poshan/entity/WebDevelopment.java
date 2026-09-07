package com.poshan.entity;

import jakarta.persistence.*;
import jdk.jfr.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "webdeveloper")
@Data
public class WebDevelopment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyname;

    private String contactperson;

    private String projectname;

    private String  projecttype;
    @Enumerated(EnumType.STRING)
    private Projectstatus status = Projectstatus.HOLD;

    @Enumerated(EnumType.STRING)
    private preority priority = preority.LOW;

    private String assigndeveloper;

    private String notes;

    private LocalDateTime assigndate;

    private LocalDateTime duedate;






}

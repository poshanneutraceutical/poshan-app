package com.poshan.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "Designing")
@Data
public class DesigningEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String projectname;
    private String companyname;
    private String designtype;

    @Enumerated(EnumType.STRING)
    private Taskstatus status = Taskstatus.IN_PROGRESS;

    private String assignby;
    private String assignto;
    private LocalDateTime assigndate;
    private LocalDateTime duedate;
    private String notes;






}

package com.poshan.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "opening")
public class OpeningEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String jobtittle;
    private String department;
    private String position;
    private LocalDateTime posteddate;
    private LocalDateTime closingdate;
    private String salaryrange;
    private String description;


}

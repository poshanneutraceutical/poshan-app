package com.poshan.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "digital market")
public class Digital {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String companyname;
    private String type;
    @Enumerated(EnumType.STRING)
    private Projectstatus status = Projectstatus.HOLD;
    private String projectname;
    private String assignto;
    private LocalDateTime assigndate;
    private LocalDateTime duedate;
    private Long leadgenerated;
    private String notes;





}

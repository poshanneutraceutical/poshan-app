package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "purchase_requisitions")
public class PR {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String prNumber;


    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;


    private String requestedBy;


    private String department;


    private String priority;


    private String remarks;


    @Enumerated(EnumType.STRING)
    private PRstatus status;


    private LocalDateTime createdAt;

    private String approvedBy;

    private  LocalDateTime approvedAt;

    private String rejectionReason;


    @OneToMany(
            mappedBy = "pr",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<PR_Item> items = new ArrayList<>();

}
package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "attendance")
@Getter
@Setter
@NoArgsConstructor
public class AttendenceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     ==========================================
     EMPLOYEE
     ==========================================
     */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "employee_id",
            nullable = false
    )
    private Employee employee;

    /*
     ==========================================
     ATTENDANCE DETAILS
     ==========================================
     */

    private LocalDate attendanceDate;

    private LocalDateTime checkIn;

    private LocalDateTime checkOut;

    @Enumerated(EnumType.STRING)
    private Attendencestatus status;

    private String ipAddress;

    /*
     ==========================================
     AUDIT
     ==========================================
     */

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /*
     ==========================================
     INDIA TIMEZONE
     ==========================================
     */

    private static final ZoneId INDIA_ZONE =
            ZoneId.of("Asia/Kolkata");

    /*
     ==========================================
     PRE PERSIST
     ==========================================
     */

    @PrePersist
    public void prePersist() {

        createdAt =
                LocalDateTime.now(INDIA_ZONE);

        updatedAt =
                LocalDateTime.now(INDIA_ZONE);
    }

    /*
     ==========================================
     PRE UPDATE
     ==========================================
     */

    @PreUpdate
    public void preUpdate() {

        updatedAt =
                LocalDateTime.now(INDIA_ZONE);
    }

}
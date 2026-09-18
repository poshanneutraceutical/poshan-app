package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "manual_attendance")
@Getter
@Setter
@NoArgsConstructor
public class ManualAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    private AttendanceWorker worker;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ManualAttendanceStatus status;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    private static final ZoneId INDIA_ZONE = ZoneId.of("Asia/Kolkata");

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now(INDIA_ZONE);
        updatedAt = LocalDateTime.now(INDIA_ZONE);
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now(INDIA_ZONE);
    }
}

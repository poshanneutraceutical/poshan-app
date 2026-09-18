package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "attendance_workers")
@Getter
@Setter
@NoArgsConstructor
public class AttendanceWorker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 30)
    private String mobile;

    @Column(length = 150)
    private String email;

    @Column(length = 100)
    private String department;

    @Column(length = 500)
    private String note;

    @Column(nullable = false)
    private boolean active = true;

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

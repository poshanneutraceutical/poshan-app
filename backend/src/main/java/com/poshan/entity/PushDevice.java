package com.poshan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "push_devices",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_push_device_fid", columnNames = "fid")
        },
        indexes = {
                @Index(name = "idx_push_device_user", columnList = "user_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PushDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 255, unique = true)
    private String fid;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime lastSeenAt = LocalDateTime.now();
}

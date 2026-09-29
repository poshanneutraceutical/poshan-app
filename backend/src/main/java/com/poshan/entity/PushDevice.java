package com.poshan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "push_devices",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_push_device_fid",
                        columnNames = "fid"
                )
        },
        indexes = {
                @Index(
                        name = "idx_push_device_user",
                        columnList = "user_id"
                )
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
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;


    /*
     * IMPORTANT:
     *
     * The database column is still called "fid" for compatibility
     * with the current database/API.
     *
     * The VALUE stored here is now the actual Firebase Cloud
     * Messaging registration token.
     *
     * Firebase FID is NOT used for sending push messages.
     */
    @Column(
            nullable = false,
            length = 512,
            unique = true
    )
    private String fid;


    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime lastSeenAt =
            LocalDateTime.now();
}
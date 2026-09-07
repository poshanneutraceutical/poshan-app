package com.poshan.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "allowed_network")
@Getter
@Setter
@NoArgsConstructor
public class AllowedNetwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "wifi_name",
            nullable = false
    )
    private String wifiName;

    @Column(
            name = "ip_address",
            nullable = false,
            unique = true
    )
    private String ipAddress;

    @Column(
            nullable = false
    )
    private Boolean status = true;

    @Column(
            name = "created_at",
            updatable = false
    )
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

    }

}
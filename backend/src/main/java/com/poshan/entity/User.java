package com.poshan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    /*
     ==========================================
     BASIC USER INFORMATION
     ==========================================
     */

    @Column(nullable = false)
    private String name;


    @Column(nullable = false, unique = true)
    private String username;


    @Column(nullable = false, unique = true)
    private String email;


    @Column(nullable = false)
    private String password;


    /*
     ==========================================
     USER POSITION
     ==========================================

     Position controls which ERP modules the
     employee can access.

     Example:

     WEB_DEVELOPMENT
     DESIGN
     MARKETING
     MRP_PRINTING
     LABOUR
     ==========================================
     */

    @Enumerated(EnumType.STRING)
    @Column(name = "position")
    private UserPosition position;


    /*
     ==========================================
     USER ROLES
     ==========================================
     */

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();


    /*
     ==========================================
     EMPLOYEE PROFILE
     ==========================================
     */

    @OneToOne(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnore
    private Employee employee;

}
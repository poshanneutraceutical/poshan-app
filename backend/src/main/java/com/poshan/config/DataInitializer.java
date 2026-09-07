package com.poshan.config;

import com.poshan.entity.Role;
import com.poshan.entity.User;
import com.poshan.repository.RoleRepository;
import com.poshan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(String... args) {

        /*
         ==========================================
         CREATE / GET ADMIN ROLE
         ==========================================
         */

        Role adminRole =
                roleRepository.findByName("ROLE_ADMIN")
                        .orElseGet(() ->
                                roleRepository.save(
                                        Role.builder()
                                                .name("ROLE_ADMIN")
                                                .build()
                                )
                        );


        /*
         ==========================================
         FIND ADMIN USER
         ==========================================
         */

        User admin =
                userRepository
                        .findByUsername("admin")
                        .orElse(null);


        /*
         ==========================================
         CREATE ADMIN IF NOT EXISTS
         ==========================================
         */

        if (admin == null) {

            admin = User.builder()

                    .name("Administrator")

                    .username("admin")

                    .email("admin@poshan.com")

                    .password(
                            passwordEncoder.encode(
                                    "Admin123"
                            )
                    )

                    .roles(
                            Set.of(adminRole)
                    )

                    .build();


            userRepository.save(admin);


            System.out.println(
                    "================================="
            );

            System.out.println(
                    "DEFAULT ADMIN CREATED"
            );

            System.out.println(
                    "Username : admin"
            );

            System.out.println(
                    "Password : Admin123"
            );

            System.out.println(
                    "Role     : ROLE_ADMIN"
            );

            System.out.println(
                    "================================="
            );

        }


        /*
         ==========================================
         EXISTING ADMIN
         ==========================================

         IMPORTANT:

         If the admin already exists but has
         no roles, assign ROLE_ADMIN.

         This fixes the exact problem currently
         happening in your database.
         ==========================================
         */

        else {

            boolean hasAdminRole =
                    admin.getRoles()
                            .stream()
                            .anyMatch(role ->
                                    "ROLE_ADMIN".equals(
                                            role.getName()
                                    )
                            );


            if (!hasAdminRole) {

                admin.getRoles()
                        .add(adminRole);


                userRepository.save(admin);


                System.out.println(
                        "================================="
                );

                System.out.println(
                        "ADMIN ROLE ASSIGNED"
                );

                System.out.println(
                        "Username : "
                                + admin.getUsername()
                );

                System.out.println(
                        "Role     : ROLE_ADMIN"
                );

                System.out.println(
                        "================================="
                );

            }

        }

    }

}
package com.poshan.config;

import com.poshan.security.CustomUserDetailsService;
import com.poshan.security.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.Customizer;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;


@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {


    /*
     ==========================================
     JWT AUTHENTICATION FILTER
     ==========================================
     */

    private final JwtAuthenticationFilter
            jwtAuthenticationFilter;


    /*
     ==========================================
     USER DETAILS SERVICE
     ==========================================
     */

    private final CustomUserDetailsService
            userDetailsService;


    /*
     ==========================================
     PASSWORD ENCODER
     ==========================================
     */

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }


    /*
     ==========================================
     DAO AUTHENTICATION PROVIDER
     ==========================================
     */

    @Bean
    public DaoAuthenticationProvider
    daoAuthenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(
                        userDetailsService
                );


        provider.setPasswordEncoder(
                passwordEncoder()
        );


        return provider;

    }


    /*
     ==========================================
     AUTHENTICATION MANAGER
     ==========================================
     */

    @Bean
    public AuthenticationManager
    authenticationManager() {

        return new ProviderManager(
                List.of(
                        daoAuthenticationProvider()
                )
        );

    }


    /*
     ==========================================
     SECURITY FILTER CHAIN
     ==========================================
     */

    @Bean
    public SecurityFilterChain
    securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http


                /*
                 ==========================================
                 CSRF
                 ==========================================
                 */

                .csrf(
                        csrf ->
                                csrf.disable()
                )


                /*
                 ==========================================
                 CORS
                 ==========================================
                 */

                .cors(
                        Customizer.withDefaults()
                )


                /*
                 ==========================================
                 SESSION MANAGEMENT
                 ==========================================
                 */

                .sessionManagement(
                        session ->
                                session.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS
                                )
                )


                /*
                 ==========================================
                 AUTHORIZATION
                 ==========================================
                 */

                .authorizeHttpRequests(
                        auth -> auth


                                /*
                                 ==========================================
                                 PUBLIC STATIC FILES
                                 ==========================================
                                 */

                                .requestMatchers(
                                        "/uploads/**"
                                )
                                .permitAll()


                                /*
                                 ==========================================
                                 PUBLIC AUTH APIs
                                 ==========================================
                                 */

                                .requestMatchers(
                                        "/api/auth/**"
                                )
                                .permitAll()


                                /*
                                 ==========================================
                                 ADMIN USER MANAGEMENT
                                 ==========================================
                                 */

                                .requestMatchers(
                                        "/api/admin/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                /*
                                 ==========================================
                                 EMPLOYEE MANAGEMENT
                                 ==========================================
                                 */

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/hr/employees"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/hr/employees/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/hr/employees/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                /*
                                 ==========================================
                                 ATTENDANCE - CHECK IN / CHECK OUT
                                 ==========================================

                                 ADMIN and EMPLOYEE roles can use
                                 employee attendance.

                                 Position restrictions will be handled
                                 separately after the position field is
                                 added to the user/employee model.
                                 ==========================================
                                 */

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/hr/attendance/check-in",
                                        "/api/hr/attendance/check-out"
                                )
                                .hasAnyRole(
                                        "ADMIN",
                                        "EMPLOYEE"
                                )


                                /*
                                 ==========================================
                                 EMPLOYEE ATTENDANCE
                                 ==========================================
                                 */

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/hr/attendance/today",
                                        "/api/hr/attendance/history",
                                        "/api/hr/attendance/access"
                                )
                                .hasAnyRole(
                                        "ADMIN",
                                        "EMPLOYEE"
                                )


                                /*
                                 ==========================================
                                 ADMIN ATTENDANCE
                                 ==========================================

                                 Admin can see:

                                 - All employees
                                 - Attendance by date
                                 - Date range
                                 - Individual employee history
                                 ==========================================
                                 */

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/hr/attendance/all",
                                        "/api/hr/attendance/date",
                                        "/api/hr/attendance/date-range",
                                        "/api/hr/attendance/employee/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                /*
                                 ==========================================
                                 TASK MODULE
                                 ==========================================
                                 */

                                .requestMatchers(
                                        "/api/tasks/**"
                                )
                                .hasAnyRole(
                                        "ADMIN",
                                        "EMPLOYEE"
                                )


                                /*
                                 ==========================================
                                 PRODUCTION MODULE
                                 ==========================================
                                 */

                                .requestMatchers(
                                        "/api/production/**"
                                )
                                .hasAnyRole(
                                        "ADMIN",
                                        "EMPLOYEE"
                                )


                                /*
                                 ==========================================
                                 INVENTORY DASHBOARD
                                 ==========================================
                                 */

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/inventory/dashboard"
                                )
                                .authenticated()


                                /*
                                 ==========================================
                                 SALES DASHBOARD
                                 ==========================================
                                 */

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/sales/dashboard"
                                )
                                .authenticated()


                                /*
                                 ==========================================
                                 GENERAL MODULES
                                 ==========================================

                                 These remain authenticated for now.

                                 Position-level backend authorization
                                 will be added once the user's position
                                 is stored in the backend model.
                                 ==========================================
                                 */

                                .requestMatchers(
                                        "/api/dashboard/**",
                                        "/api/inventory/**",
                                        "/api/procurement/**",
                                        "/api/approval/**",
                                        "/api/sales/**",
                                        "/api/designing/**",
                                        "/api/digital/**",
                                        "/api/web/**",
                                        "/api/box-dimensions/**"
                                )
                                .authenticated()


                                /*
                                 ==========================================
                                 USER ACCOUNT MODULE
                                 ==========================================
                                 */

                                .requestMatchers(
                                        "/api/user/**"
                                )
                                .hasAnyRole(
                                        "USER",
                                        "ADMIN"
                                )


                                /*
                                 ==========================================
                                 ANY OTHER REQUEST
                                 ==========================================
                                 */

                                .anyRequest()
                                .authenticated()

                )


                /*
                 ==========================================
                 AUTHENTICATION PROVIDER
                 ==========================================
                 */

                .authenticationProvider(
                        daoAuthenticationProvider()
                )


                /*
                 ==========================================
                 JWT FILTER
                 ==========================================
                 */

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();

    }

}
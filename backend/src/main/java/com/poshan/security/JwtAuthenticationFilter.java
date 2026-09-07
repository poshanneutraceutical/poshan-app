package com.poshan.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final CustomUserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {


        /*
         ==========================================
         REQUEST INFORMATION
         ==========================================
         */

        System.out.println();
        System.out.println("==========================================");
        System.out.println("JWT FILTER");
        System.out.println("Method : " + request.getMethod());
        System.out.println("URI    : " + request.getRequestURI());
        System.out.println("==========================================");


        String authHeader =
                request.getHeader("Authorization");


        String token = null;

        String username = null;


        /*
         ==========================================
         CHECK AUTHORIZATION HEADER
         ==========================================
         */

        if (
                authHeader != null &&
                        authHeader.startsWith("Bearer ")
        ) {

            token =
                    authHeader.substring(7);

            System.out.println(
                    "Authorization header found."
            );


            try {

                username =
                        jwtService.extractUsername(token);

                System.out.println(
                        "JWT Username : " + username
                );

            } catch (Exception e) {

                System.out.println(
                        "JWT extraction failed: "
                                + e.getMessage()
                );

            }

        } else {

            System.out.println(
                    "No Bearer token found."
            );

        }


        /*
         ==========================================
         SET AUTHENTICATION
         ==========================================
         */

        if (
                username != null &&
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication() == null
        ) {

            try {

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(username);


                /*
                 ==========================================
                 USER AUTHORITIES
                 ==========================================
                 */

                Collection<? extends GrantedAuthority>
                        authorities =
                        userDetails.getAuthorities();


                System.out.println(
                        "Username : "
                                + userDetails.getUsername()
                );


                System.out.println(
                        "Authorities : "
                                + authorities
                );


                /*
                 ==========================================
                 VALIDATE TOKEN
                 ==========================================
                 */

                if (
                        jwtService.isTokenValid(
                                token,
                                userDetails
                        )
                ) {

                    UsernamePasswordAuthenticationToken
                            authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    authorities
                            );


                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );


                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authToken);


                    /*
                     ==========================================
                     CONFIRM AUTHENTICATION
                     ==========================================
                     */

                    Authentication authentication =
                            SecurityContextHolder
                                    .getContext()
                                    .getAuthentication();


                    System.out.println(
                            "Authentication SUCCESS"
                    );

                    System.out.println(
                            "Authenticated User : "
                                    + authentication.getName()
                    );

                    System.out.println(
                            "Granted Authorities : "
                                    + authentication
                                    .getAuthorities()
                    );

                    System.out.println(
                            "Is Authenticated : "
                                    + authentication
                                    .isAuthenticated()
                    );

                } else {

                    System.out.println(
                            "JWT token is INVALID."
                    );

                }

            } catch (Exception e) {

                System.out.println(
                        "Authentication processing failed:"
                );

                e.printStackTrace();

            }

        }


        /*
         ==========================================
         CONTINUE REQUEST
         ==========================================
         */

        filterChain.doFilter(
                request,
                response
        );

    }

}
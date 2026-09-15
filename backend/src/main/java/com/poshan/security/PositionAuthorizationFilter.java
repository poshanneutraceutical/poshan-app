package com.poshan.security;

import com.poshan.entity.UserPosition;
import com.poshan.security.CustomUserDetails;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class PositionAuthorizationFilter
        extends OncePerRequestFilter {


    /*
     ==========================================
     DO FILTER INTERNAL
     ==========================================
     */

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {


        String uri =
                request.getRequestURI();


        /*
         ==========================================
         ONLY HANDLE API REQUESTS
         ==========================================
         */

        if (!uri.startsWith("/api/")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        /*
         ==========================================
         PUBLIC ENDPOINTS
         ==========================================
         */

        if (
                uri.startsWith("/api/auth/login")
                        ||
                        uri.startsWith("/api/uploads/")
        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        /*
         ==========================================
         GET AUTHENTICATION
         ==========================================
         */

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        /*
         ==========================================
         NO AUTHENTICATION

         Let Spring Security handle it.
         ==========================================
         */

        if (
                authentication == null
                        ||
                        !authentication.isAuthenticated()
        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        /*
         ==========================================
         ADMIN CHECK

         ADMIN HAS FULL ACCESS
         ==========================================
         */

        boolean isAdmin =
                authentication
                        .getAuthorities()
                        .stream()
                        .anyMatch(authority -> {

                            String authorityName =
                                    authority.getAuthority();

                            if (authorityName == null) {
                                return false;
                            }

                            return "ROLE_ADMIN".equalsIgnoreCase(
                                    authorityName
                            )
                                    ||
                                    "ADMIN".equalsIgnoreCase(
                                            authorityName
                                    );
                        });


        if (isAdmin) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        /*
         ==========================================
         NOTIFICATIONS

         Notifications are available to authenticated users.
         Ownership/business rules are handled by the service layer.
         ==========================================
         */

        if (
                uri.startsWith("/api/notifications/")
                        || uri.equals("/api/notifications")
        ) {
            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        /*
         ==========================================
         GET USER POSITION
         ==========================================
         */

        Object principal =
                authentication.getPrincipal();


        if (!(principal instanceof CustomUserDetails)) {

            sendForbidden(
                    response,
                    "User position could not be determined."
            );

            return;
        }


        CustomUserDetails userDetails =
                (CustomUserDetails) principal;


        UserPosition position =
                userDetails
                        .getUser()
                        .getPosition();


        /*
         ==========================================
         POSITION REQUIRED
         ==========================================
         */

        if (position == null) {

            sendForbidden(
                    response,
                    "User position is not assigned."
            );

            return;
        }


        /*
         ==========================================
         ATTENDANCE

         ALL AUTHENTICATED EMPLOYEES CAN ACCESS
         EMPLOYEE ATTENDANCE.
         ==========================================
         */

        if (
                uri.startsWith(
                        "/api/hr/attendance"
                )
        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        /*
         ==========================================
         WEB DEVELOPMENT

         WEB_DEVELOPMENT POSITION ONLY
         ==========================================
         */

        if (
                uri.startsWith(
                        "/api/web/"
                )
        ) {

            if (
                    position ==
                            UserPosition.WEB_DEVELOPMENT
            ) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            sendForbidden(
                    response,
                    "You do not have permission to access Web Development."
            );

            return;
        }


        /*
         ==========================================
         DESIGNING

         DESIGN POSITION ONLY
         ==========================================
         */

        if (
                uri.startsWith(
                        "/api/designing/"
                )
        ) {

            if (
                    position ==
                            UserPosition.DESIGN
            ) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            sendForbidden(
                    response,
                    "You do not have permission to access Designing."
            );

            return;
        }


        /*
         ==========================================
         DIGITAL MARKETING

         MARKETING POSITION ONLY
         ==========================================
         */

        if (
                uri.startsWith(
                        "/api/digital/"
                )
        ) {

            if (
                    position ==
                            UserPosition.MARKETING
            ) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            sendForbidden(
                    response,
                    "You do not have permission to access Digital Marketing."
            );

            return;
        }


        /*
         ==========================================
         MRP PRINTING

         MRP_PRINTING POSITION ONLY
         ==========================================
         */

        if (
                uri.equals("/api/mrp")
                        ||
                        uri.startsWith("/api/mrp/")
        ) {

            if (
                    position ==
                            UserPosition.MRP_PRINTING
            ) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            sendForbidden(
                    response,
                    "You do not have permission to access MRP Printing."
            );

            return;
        }


        /*
         ==========================================
         BOX DIMENSIONS

         DESIGN POSITION ONLY
         ==========================================
         */

        if (
                uri.equals("/api/box-dimensions")
                        ||
                        uri.startsWith("/api/box-dimensions/")
        ) {
            if (
                    position ==
                            UserPosition.DESIGN
            ) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }

            sendForbidden(
                    response,
                    "You do not have permission to access Box Dimensions."
            );

            return;
        }


        /*
         ==========================================
         JOB OPENINGS

         ALL AUTHENTICATED EMPLOYEES
         can view existing openings and create a new
         opening. ADMIN was already handled above.

         UPDATE and DELETE remain ADMIN-only.

         IMPORTANT:
         The controller is mapped to:

             /api/hr/openings

         not /api/openings/**.
         ==========================================
         */

        if (
                uri.equals("/api/hr/openings")
                        ||
                        uri.startsWith("/api/hr/openings/")
        ) {

            String method = request.getMethod();

            boolean allowedForEmployee =
                    "GET".equalsIgnoreCase(method)
                            ||
                            "POST".equalsIgnoreCase(method);

            if (allowedForEmployee) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }

            sendForbidden(
                    response,
                    "Only administrators can update or delete job openings."
            );

            return;
        }


        /*
         ==========================================
         MAIN DASHBOARD

         ADMIN ONLY
         ==========================================
         */

        if (
                uri.equals("/api/dashboard")
                        ||
                        uri.startsWith("/api/dashboard/")
        ) {
            sendForbidden(
                    response,
                    "You do not have permission to access Dashboard."
            );

            return;
        }


        /*
         ==========================================
         TASK DEPARTMENT ACCESS
         ==========================================

         WEB_DEVELOPMENT
             -> WEB_DEVELOPMENT tasks

         DESIGN
             -> DESIGN tasks

         MARKETING
             -> MARKETING tasks

         MRP_PRINTING
             -> MRP_PRINTING tasks

         LABOUR
             -> NO departmental task access

         ADMIN was already handled above.
         ==========================================
         */

        if (
                uri.startsWith(
                        "/api/tasks/department/"
                )
        ) {

            String department =
                    uri.substring(
                                    "/api/tasks/department/"
                                            .length()
                            )
                            .toUpperCase();


            boolean allowed =
                    switch (position) {

                        case WEB_DEVELOPMENT ->
                                "WEB_DEVELOPMENT"
                                        .equals(department);

                        case DESIGN ->
                                "DESIGN"
                                        .equals(department);

                        case MARKETING ->
                                "MARKETING"
                                        .equals(department);

                        case MRP_PRINTING ->
                                "MRP_PRINTING"
                                        .equals(department);

                        case LABOUR ->
                                false;
                    };


            if (allowed) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            sendForbidden(
                    response,
                    "You do not have permission to access these tasks."
            );

            return;
        }


        /*
         ==========================================
         TASK DETAIL VIEW

         Employees can open an individual task from
         their department module. TaskService performs
         the second security check and verifies that the
         task belongs to the employee's department.

         Only GET of a concrete numeric task id is
         allowed here. Create/update/delete remain
         outside this employee rule and therefore stay
         protected.
         ==========================================
         */

        if (
                "GET".equalsIgnoreCase(request.getMethod())
                        &&
                        uri.matches("^/api/tasks/[0-9]+$")
        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        /*
         ==========================================
         ALL OTHER API ENDPOINTS

         POSITION BASED USERS ARE NOT ALLOWED
         UNLESS AN EXPLICIT RULE ABOVE EXISTS.
         ==========================================
         */

        sendForbidden(
                response,
                "You do not have permission to access this module."
        );

    }


    /*
     ==========================================
     SEND FORBIDDEN RESPONSE
     ==========================================
     */

    private void sendForbidden(
            HttpServletResponse response,
            String message
    ) throws IOException {

        response.setStatus(
                HttpServletResponse.SC_FORBIDDEN
        );


        response.setContentType(
                "application/json"
        );


        response.setCharacterEncoding(
                "UTF-8"
        );


        response.getWriter().write(
                "{\"message\":\""
                        + message
                        + "\"}"
        );

    }

}
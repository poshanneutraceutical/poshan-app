package com.poshan.service;

import com.poshan.dto.AttendanceAccessDTO;
import com.poshan.dto.AttendanceDTO;
import com.poshan.entity.AllowedNetwork;
import com.poshan.entity.AttendenceEntity;
import com.poshan.entity.Attendencestatus;
import com.poshan.entity.Employee;
import com.poshan.entity.User;

import com.poshan.exception.EmployeeNotFoundException;

import com.poshan.repository.AllowedNetworkRepository;
import com.poshan.repository.AttendanceRepository;
import com.poshan.repository.EmployeeRepository;
import com.poshan.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {


    private final AllowedNetworkRepository
            allowedNetworkRepository;

    private final AttendanceRepository
            attendanceRepository;

    private final EmployeeRepository
            employeeRepository;

    private final UserRepository
            userRepository;


    // =========================================================
    // EMPLOYEE CHECK IN
    // =========================================================

    public AttendanceDTO checkIn(
            HttpServletRequest request
    ) {

        Employee employee =
                getLoggedInEmployee();


        String ipAddress =
                getClientIp(request);


        /*
         =====================================================
         CHECK ALLOWED NETWORK
         =====================================================
         */

        Optional<AllowedNetwork> allowedNetwork =
                allowedNetworkRepository
                        .findByIpAddressAndStatusTrue(
                                ipAddress
                        );


        if (allowedNetwork.isEmpty()) {

            throw new RuntimeException(
                    "Please connect to the company Wi-Fi."
            );

        }


        /*
         =====================================================
         CHECK DUPLICATE ATTENDANCE
         =====================================================
         */

        Optional<AttendenceEntity>
                existingAttendance =

                attendanceRepository
                        .findByEmployeeAndAttendanceDate(
                                employee,
                                LocalDate.now()
                        );


        if (existingAttendance.isPresent()) {

            throw new RuntimeException(
                    "Attendance already marked today."
            );

        }


        /*
         =====================================================
         CREATE ATTENDANCE
         =====================================================
         */

        AttendenceEntity attendance =
                new AttendenceEntity();


        attendance.setEmployee(
                employee
        );


        attendance.setAttendanceDate(
                LocalDate.now()
        );


        attendance.setCheckIn(
                LocalDateTime.now()
        );


        attendance.setStatus(
                Attendencestatus.PRESENT
        );


        attendance.setIpAddress(
                ipAddress
        );


        AttendenceEntity savedAttendance =
                attendanceRepository.save(
                        attendance
                );


        return mapToDTO(
                savedAttendance
        );

    }


    // =========================================================
    // GET LOGGED-IN EMPLOYEE
    // =========================================================

    private Employee getLoggedInEmployee() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        if (
                authentication == null ||
                        authentication.getName() == null
        ) {

            throw new RuntimeException(
                    "User is not authenticated."
            );

        }


        String username =
                authentication.getName();


        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found."
                                        )
                        );


        return employeeRepository
                .findByUser(user)
                .orElseThrow(
                        () ->
                                new EmployeeNotFoundException(
                                        "Attendance is available only for employee accounts."
                                )
                );

    }


    // =========================================================
    // CLIENT IP
    // =========================================================

    private String getClientIp(
            HttpServletRequest request
    ) {

        String ipAddress =
                request.getHeader(
                        "X-Forwarded-For"
                );


        if (
                ipAddress == null ||
                        ipAddress.isBlank()
        ) {

            ipAddress =
                    request.getRemoteAddr();

        }


        if (
                ipAddress.contains(",")
        ) {

            ipAddress =
                    ipAddress
                            .split(",")[0]
                            .trim();

        }


        System.out.println(
                "ATTENDANCE CLIENT IP = "
                        + ipAddress
        );


        return ipAddress;

    }


    // =========================================================
    // EMPLOYEE CHECK OUT
    // =========================================================

    public AttendanceDTO checkOut() {

        Employee employee =
                getLoggedInEmployee();


        AttendenceEntity attendance =
                attendanceRepository
                        .findByEmployeeAndAttendanceDate(
                                employee,
                                LocalDate.now()
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Check-in not found."
                                        )
                        );


        if (
                attendance.getCheckOut()
                        != null
        ) {

            throw new RuntimeException(
                    "You have already checked out today."
            );

        }


        attendance.setCheckOut(
                LocalDateTime.now()
        );


        AttendenceEntity updatedAttendance =
                attendanceRepository.save(
                        attendance
                );


        return mapToDTO(
                updatedAttendance
        );

    }


    // =========================================================
    // TODAY'S ATTENDANCE
    // =========================================================

    public AttendanceDTO getTodayAttendance() {

        Employee employee =
                getLoggedInEmployee();


        AttendenceEntity attendance =
                attendanceRepository
                        .findByEmployeeAndAttendanceDate(
                                employee,
                                LocalDate.now()
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "No attendance found for today."
                                        )
                        );


        return mapToDTO(
                attendance
        );

    }


    // =========================================================
    // EMPLOYEE - OWN HISTORY
    // =========================================================

    public List<AttendanceDTO>
    getAttendanceHistory() {

        Employee employee =
                getLoggedInEmployee();


        return attendanceRepository
                .findByEmployee(employee)
                .stream()
                .map(this::mapToDTO)
                .toList();

    }


    // =========================================================
    // ADMIN - ALL ATTENDANCE
    // =========================================================

    public List<AttendanceDTO>
    getAllAttendance() {

        return attendanceRepository
                .findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();

    }


    // =========================================================
    // ADMIN - ATTENDANCE BY DATE
    // =========================================================

    public List<AttendanceDTO>
    getAttendanceByDate(
            LocalDate date
    ) {

        return attendanceRepository
                .findByAttendanceDate(date)
                .stream()
                .map(this::mapToDTO)
                .toList();

    }


    // =========================================================
    // ADMIN - ATTENDANCE DATE RANGE
    // =========================================================

    public List<AttendanceDTO>
    getAttendanceBetweenDates(
            LocalDate startDate,
            LocalDate endDate
    ) {

        if (
                startDate == null ||
                        endDate == null
        ) {

            throw new RuntimeException(
                    "Start date and end date are required."
            );

        }


        if (
                startDate.isAfter(endDate)
        ) {

            throw new RuntimeException(
                    "Start date cannot be after end date."
            );

        }


        return attendanceRepository
                .findByAttendanceDateBetween(
                        startDate,
                        endDate
                )
                .stream()
                .map(this::mapToDTO)
                .toList();

    }


    // =========================================================
    // ADMIN - SELECTED EMPLOYEE + MONTH
    // =========================================================

    public List<AttendanceDTO>
    getEmployeeAttendanceByMonth(
            Long employeeId,
            int year,
            int month
    ) {

        if (
                month < 1 ||
                        month > 12
        ) {

            throw new RuntimeException(
                    "Month must be between 1 and 12."
            );

        }


        if (
                year < 2000 ||
                        year > 2100
        ) {

            throw new RuntimeException(
                    "Invalid year."
            );

        }


        Employee employee =
                employeeRepository
                        .findById(employeeId)
                        .orElseThrow(
                                () ->
                                        new EmployeeNotFoundException(
                                                "Employee not found."
                                        )
                        );


        LocalDate startDate =
                LocalDate.of(
                        year,
                        month,
                        1
                );


        LocalDate endDate =
                startDate.withDayOfMonth(
                        startDate.lengthOfMonth()
                );


        return attendanceRepository
                .findByEmployeeAndAttendanceDateBetween(
                        employee,
                        startDate,
                        endDate
                )
                .stream()
                .map(this::mapToDTO)
                .toList();

    }


    // =========================================================
    // ATTENDANCE ACCESS
    // =========================================================

    public AttendanceAccessDTO
    checkAttendanceAccess() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        if (
                authentication == null ||
                        authentication.getName() == null
        ) {

            throw new RuntimeException(
                    "User is not authenticated."
            );

        }


        String username =
                authentication.getName();


        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found."
                                        )
                        );


        boolean employeeExists =
                employeeRepository
                        .findByUser(user)
                        .isPresent();


        if (employeeExists) {

            return new AttendanceAccessDTO(
                    true,
                    "Employee profile found."
            );

        }


        return new AttendanceAccessDTO(
                false,
                "Attendance is available only for employee accounts."
        );

    }


    // =========================================================
    // ENTITY -> DTO
    // =========================================================

    private AttendanceDTO mapToDTO(
            AttendenceEntity attendance
    ) {

        AttendanceDTO dto =
                new AttendanceDTO();


        dto.setId(
                attendance.getId()
        );


        dto.setEmployeeId(
                attendance
                        .getEmployee()
                        .getId()
        );


        dto.setEmployeeCode(
                attendance
                        .getEmployee()
                        .getEmployeeCode()
        );


        dto.setEmployeeName(
                attendance
                        .getEmployee()
                        .getUser()
                        .getName()
        );


        dto.setAttendanceDate(
                attendance
                        .getAttendanceDate()
        );


        dto.setCheckIn(
                attendance
                        .getCheckIn()
        );


        dto.setCheckOut(
                attendance
                        .getCheckOut()
        );


        dto.setStatus(
                attendance
                        .getStatus()
        );


        dto.setIpAddress(
                attendance
                        .getIpAddress()
        );


        return dto;

    }

}
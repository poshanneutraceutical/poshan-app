package com.poshan.controller;

import com.poshan.dto.AttendanceAccessDTO;
import com.poshan.dto.AttendanceDTO;
import com.poshan.service.AttendanceService;

import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/hr/attendance")
@RequiredArgsConstructor
public class AttendanceController {


    private final AttendanceService attendanceService;


    // =========================================================
    // EMPLOYEE - CHECK IN
    // =========================================================

    @PostMapping("/check-in")
    public ResponseEntity<AttendanceDTO>
    checkIn(
            HttpServletRequest request
    ) {

        return ResponseEntity.ok(
                attendanceService.checkIn(
                        request
                )
        );

    }


    // =========================================================
    // EMPLOYEE - CHECK OUT
    // =========================================================

    @PostMapping("/check-out")
    public ResponseEntity<AttendanceDTO>
    checkOut() {

        return ResponseEntity.ok(
                attendanceService.checkOut()
        );

    }


    // =========================================================
    // EMPLOYEE - TODAY
    // =========================================================

    @GetMapping("/today")
    public ResponseEntity<AttendanceDTO>
    getTodayAttendance() {

        return ResponseEntity.ok(
                attendanceService
                        .getTodayAttendance()
        );

    }


    // =========================================================
    // EMPLOYEE - OWN HISTORY
    // =========================================================

    @GetMapping("/history")
    public ResponseEntity<List<AttendanceDTO>>
    getAttendanceHistory() {

        return ResponseEntity.ok(
                attendanceService
                        .getAttendanceHistory()
        );

    }


    // =========================================================
    // ADMIN - ALL ATTENDANCE
    // =========================================================

    @GetMapping("/all")
    public ResponseEntity<List<AttendanceDTO>>
    getAllAttendance() {

        return ResponseEntity.ok(
                attendanceService
                        .getAllAttendance()
        );

    }


    // =========================================================
    // ADMIN - ATTENDANCE BY DATE
    // =========================================================

    @GetMapping("/date")
    public ResponseEntity<List<AttendanceDTO>>
    getAttendanceByDate(
            @RequestParam LocalDate date
    ) {

        return ResponseEntity.ok(
                attendanceService
                        .getAttendanceByDate(
                                date
                        )
        );

    }


    // =========================================================
    // ADMIN - ATTENDANCE DATE RANGE
    // =========================================================

    @GetMapping("/date-range")
    public ResponseEntity<List<AttendanceDTO>>
    getAttendanceBetweenDates(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {

        return ResponseEntity.ok(
                attendanceService
                        .getAttendanceBetweenDates(
                                startDate,
                                endDate
                        )
        );

    }


    // =========================================================
    // ADMIN - SELECTED EMPLOYEE + MONTH
    // =========================================================

    @GetMapping("/employee/{employeeId}/month")
    public ResponseEntity<List<AttendanceDTO>>
    getEmployeeAttendanceByMonth(
            @PathVariable Long employeeId,
            @RequestParam int year,
            @RequestParam int month
    ) {

        return ResponseEntity.ok(
                attendanceService
                        .getEmployeeAttendanceByMonth(
                                employeeId,
                                year,
                                month
                        )
        );

    }


    // =========================================================
    // EMPLOYEE PROFILE ACCESS CHECK
    // =========================================================

    @GetMapping("/access")
    public ResponseEntity<AttendanceAccessDTO>
    checkAttendanceAccess() {

        return ResponseEntity.ok(
                attendanceService
                        .checkAttendanceAccess()
        );

    }

}
package com.poshan.dto;

import com.poshan.entity.Attendencestatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AttendanceDTO {

    private Long id;

    private Long employeeId;

    private String employeeCode;

    private String employeeName;

    private LocalDate attendanceDate;

    private LocalDateTime checkIn;

    private LocalDateTime checkOut;

    private Attendencestatus status;

    private String ipAddress;
}
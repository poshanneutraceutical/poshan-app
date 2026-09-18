package com.poshan.dto;

import com.poshan.entity.ManualAttendanceStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ManualAttendanceHistoryDTO {

    private Long id;
    private String personType;
    private Long personId;
    private String name;
    private String email;
    private LocalDate attendanceDate;
    private ManualAttendanceStatus status;
}

package com.poshan.dto;

import com.poshan.entity.ManualAttendanceStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ManualAttendanceRequestDTO {

    private String personType;
    private Long personId;
    private LocalDate attendanceDate;
    private ManualAttendanceStatus status;
}

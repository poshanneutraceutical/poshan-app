package com.poshan.dto;

import com.poshan.entity.ManualAttendanceStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ManualAttendancePersonDTO {

    private String personType;
    private Long personId;
    private String name;
    private String email;
    private String mobile;
    private String employeeCode;
    private String department;
    private String note;
    private ManualAttendanceStatus status;
    private Long attendanceId;
    private boolean worker;
}

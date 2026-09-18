package com.poshan.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AttendanceWorkerDTO {

    private Long id;
    private String name;
    private String mobile;
    private String email;
    private String department;
    private String note;
    private boolean active = true;
}

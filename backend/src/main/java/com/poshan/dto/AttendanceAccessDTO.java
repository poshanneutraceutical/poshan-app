
package com.poshan.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AttendanceAccessDTO {

    private boolean employeeExists;

    private String message;

}
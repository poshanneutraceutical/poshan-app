package com.poshan.dto;

import com.poshan.entity.Department;
import com.poshan.entity.DesignationEntity;
import com.poshan.entity.EmployeeStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeDTO {

    private Long id;

    private String employeeCode;

    private String firstName;

    private String lastName;

    private String email;

    private String mobile;

    private Department department;

    private DesignationEntity designation;

    private EmployeeStatus status;

    private LocalDate dateOfJoining;

    private BigDecimal salary;

    private String address;

    private String city;

    private String state;

    private String country;

    private String pincode;

    private String username;

    private String password;

    private String role;

    private String profileImage;

    private String alternateMobile;

    private String aadhaarNumber;

    private String panNumber;

    private String emergencyContactName;

    private String emergencyContactNumber;

    private String bankName;

    private String accountHolderName;

    private String accountNumber;

    private String ifscCode;

    private String note;
}
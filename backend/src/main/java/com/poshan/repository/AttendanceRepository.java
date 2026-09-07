package com.poshan.repository;

import com.poshan.entity.AttendenceEntity;
import com.poshan.entity.Employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository
        extends JpaRepository<AttendenceEntity, Long> {


    /*
     =========================================================
     EMPLOYEE - TODAY
     =========================================================
     */

    Optional<AttendenceEntity>
    findByEmployeeAndAttendanceDate(
            Employee employee,
            LocalDate attendanceDate
    );


    /*
     =========================================================
     EMPLOYEE - ALL HISTORY
     =========================================================
     */

    List<AttendenceEntity>
    findByEmployee(
            Employee employee
    );


    /*
     =========================================================
     ALL EMPLOYEES - BY DATE
     =========================================================
     */

    List<AttendenceEntity>
    findByAttendanceDate(
            LocalDate attendanceDate
    );


    /*
     =========================================================
     ALL EMPLOYEES - DATE RANGE
     =========================================================
     */

    List<AttendenceEntity>
    findByAttendanceDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );


    /*
     =========================================================
     ONE EMPLOYEE - DATE RANGE
     =========================================================
     */

    List<AttendenceEntity>
    findByEmployeeAndAttendanceDateBetween(
            Employee employee,
            LocalDate startDate,
            LocalDate endDate
    );

}
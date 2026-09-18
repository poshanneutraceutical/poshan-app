package com.poshan.repository;

import com.poshan.entity.AttendanceWorker;
import com.poshan.entity.Employee;
import com.poshan.entity.ManualAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ManualAttendanceRepository
        extends JpaRepository<ManualAttendance, Long> {

    Optional<ManualAttendance> findByEmployeeAndAttendanceDate(
            Employee employee,
            java.time.LocalDate attendanceDate
    );

    Optional<ManualAttendance> findByWorkerAndAttendanceDate(
            AttendanceWorker worker,
            java.time.LocalDate attendanceDate
    );

    List<ManualAttendance> findByEmployeeOrderByAttendanceDateDesc(
            Employee employee
    );

    List<ManualAttendance> findByWorkerOrderByAttendanceDateDesc(
            AttendanceWorker worker
    );
}

package com.poshan.repository;

import com.poshan.entity.AttendanceWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceWorkerRepository
        extends JpaRepository<AttendanceWorker, Long> {

    List<AttendanceWorker> findByActiveTrueOrderByNameAsc();
}

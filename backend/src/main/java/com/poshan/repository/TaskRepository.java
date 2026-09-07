package com.poshan.repository;

import com.poshan.entity.Department;
import com.poshan.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository
        extends JpaRepository<Task, Long> {

    List<Task> findByDepartmentOrderByIdDesc(
            Department department
    );

    List<Task> findByDepartmentAndAssignedToOrderByIdDesc(
            Department department,
            String assignedTo
    );

}
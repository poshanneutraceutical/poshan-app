package com.poshan.repository;

import com.poshan.entity.Employee;
import com.poshan.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    Optional<Employee> findByEmployeeCode(String employeeCode);

    boolean existsByEmail(String email);

    boolean existsByEmployeeCode(String employeeCode);

    Optional<Employee> findByUserId(Long userId);

    Optional<Employee> findByUser(User user);

    Employee findTopByOrderByIdDesc();
}
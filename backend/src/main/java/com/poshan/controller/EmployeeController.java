package com.poshan.controller;

import com.poshan.dto.EmployeeDTO;
import com.poshan.service.EmployeeService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/hr/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {


    private final EmployeeService employeeService;


    // =========================================================
    // CREATE EMPLOYEE
    // =========================================================

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<EmployeeDTO> createEmployee(

            @RequestPart("employee")
            EmployeeDTO employeeDTO,

            @RequestPart(
                    value = "profileImage",
                    required = false
            )
            MultipartFile profileImage

    ) {

        return ResponseEntity.ok(
                employeeService.createEmployee(
                        employeeDTO,
                        profileImage
                )
        );

    }


    // =========================================================
    // GET ALL EMPLOYEES
    // =========================================================

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>>
    getAllEmployees() {

        return ResponseEntity.ok(
                employeeService.getAllEmployees()
        );

    }


    // =========================================================
    // GET EMPLOYEE BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO>
    getEmployeeById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                employeeService.getEmployeeById(id)
        );

    }


    // =========================================================
    // UPDATE EMPLOYEE
    // =========================================================

    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<EmployeeDTO> updateEmployee(

            @PathVariable Long id,

            @RequestPart("employee")
            EmployeeDTO employeeDTO,

            @RequestPart(
                    value = "profileImage",
                    required = false
            )
            MultipartFile profileImage

    ) {

        return ResponseEntity.ok(
                employeeService.updateEmployee(
                        id,
                        employeeDTO,
                        profileImage
                )
        );

    }


    // =========================================================
    // DELETE EMPLOYEE
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteEmployee(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                employeeService.deleteEmployee(id)
        );

    }

}
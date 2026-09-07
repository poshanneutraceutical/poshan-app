package com.poshan.service;

import com.poshan.dto.EmployeeDTO;
import com.poshan.entity.Employee;
import com.poshan.entity.Role;
import com.poshan.entity.User;
import com.poshan.repository.EmployeeRepository;
import com.poshan.repository.RoleRepository;
import com.poshan.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final FileStorageService fileStorageService;


    /*
     ==========================================
     CREATE EMPLOYEE + USER ACCOUNT
     ==========================================
     */

    @Transactional
    public EmployeeDTO createEmployee(
            EmployeeDTO employeeDTO,
            MultipartFile profileImage
    ) {

        /*
         ==========================================
         VALIDATION
         ==========================================
         */

        if (employeeDTO == null) {

            throw new RuntimeException(
                    "Employee data is required."
            );

        }


        if (
                employeeDTO.getUsername() == null
                        || employeeDTO.getUsername().isBlank()
        ) {

            throw new RuntimeException(
                    "Username is required."
            );

        }


        if (
                employeeDTO.getPassword() == null
                        || employeeDTO.getPassword().isBlank()
        ) {

            throw new RuntimeException(
                    "Password is required."
            );

        }


        if (
                employeeDTO.getEmail() == null
                        || employeeDTO.getEmail().isBlank()
        ) {

            throw new RuntimeException(
                    "Email is required."
            );

        }


        /*
         ==========================================
         CHECK USERNAME

         USERNAME MUST REMAIN UNIQUE
         ==========================================
         */

        String username = employeeDTO.getUsername().trim();

        if (userRepository.existsByUsername(username)) {

            throw new RuntimeException(
                    "Username already exists."
            );

        }


        /*
         ==========================================
         EMAIL

         EMAIL IS ALLOWED TO BE DUPLICATED.

         Multiple employees/users can have the
         same email address.
         ==========================================
         */

        String email = employeeDTO.getEmail().trim();


        /*
         ==========================================
         FIND ROLE
         ==========================================
         */

        String roleName = employeeDTO.getRole();

        if (roleName == null || roleName.isBlank()) {

            roleName = "ROLE_EMPLOYEE";

        }

        roleName = roleName.trim().toUpperCase();

        if (!roleName.startsWith("ROLE_")) {

            roleName = "ROLE_" + roleName;

        }

        final String finalRoleName = roleName;

        Role role =
                roleRepository
                        .findByName(finalRoleName)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Role not found: "
                                                + finalRoleName
                                )
                        );


        /*
         ==========================================
         CREATE USER
         ==========================================
         */

        User user = new User();


        String firstName =
                employeeDTO.getFirstName() != null
                        ? employeeDTO.getFirstName().trim()
                        : "";


        String lastName =
                employeeDTO.getLastName() != null
                        ? employeeDTO.getLastName().trim()
                        : "";


        String fullName =
                (firstName + " " + lastName).trim();


        user.setName(fullName);

        user.setUsername(username);

        user.setEmail(email);

        user.setPassword(
                passwordEncoder.encode(
                        employeeDTO.getPassword()
                )
        );


        /*
         ==========================================
         ROLE
         ==========================================
         */

        Set<Role> roles = new HashSet<>();

        roles.add(role);

        user.setRoles(roles);


        /*
         ==========================================
         SAVE USER
         ==========================================
         */

        User savedUser =
                userRepository.save(user);


        /*
         ==========================================
         CREATE EMPLOYEE
         ==========================================
         */

        Employee employee = new Employee();

        employee.setUser(savedUser);


        /*
         ==========================================
         GENERATE EMPLOYEE CODE
         ==========================================
         */

        employee.setEmployeeCode(
                generateEmployeeCode()
        );


        /*
         ==========================================
         COPY EMPLOYEE FIELDS
         ==========================================
         */

        updateEmployeeFields(
                employee,
                employeeDTO
        );


        /*
         ==========================================
         SAVE EMPLOYEE FIRST

         This generates employee.getId().

         DO NOT save the profile image before
         the employee has been saved.
         ==========================================
         */

        Employee savedEmployee =
                employeeRepository.save(
                        employee
                );


        /*
         ==========================================
         PROFILE IMAGE
         ==========================================
         */

        if (
                profileImage != null
                        && !profileImage.isEmpty()
        ) {

            String imagePath =
                    fileStorageService
                            .saveEmployeeProfileImage(
                                    profileImage,
                                    savedEmployee.getId()
                            );


            savedEmployee.setProfileImage(
                    imagePath
            );


            savedEmployee =
                    employeeRepository.save(
                            savedEmployee
                    );

        }


        /*
         ==========================================
         RETURN
         ==========================================
         */

        return mapToDTO(
                savedEmployee
        );

    }


    /*
     ==========================================
     GET EMPLOYEE BY ID
     ==========================================
     */

    public EmployeeDTO getEmployeeById(
            Long id
    ) {

        Employee employee =
                employeeRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee not found."
                                )
                        );


        return mapToDTO(
                employee
        );

    }


    /*
     ==========================================
     GET ALL EMPLOYEES
     ==========================================
     */

    public List<EmployeeDTO> getAllEmployees() {

        return employeeRepository
                .findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();

    }


    /*
     ==========================================
     UPDATE EMPLOYEE
     ==========================================
     */

    @Transactional
    public EmployeeDTO updateEmployee(
            Long id,
            EmployeeDTO employeeDTO,
            MultipartFile profileImage
    ) {

        Employee employee =
                employeeRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee not found."
                                )
                        );


        User user =
                employee.getUser();


        if (user == null) {

            throw new RuntimeException(
                    "Employee user account not found."
            );

        }


        /*
         ==========================================
         VALIDATE USERNAME

         USERNAME MUST REMAIN UNIQUE.
         ==========================================
         */

        String newUsername =
                employeeDTO.getUsername() != null
                        ? employeeDTO.getUsername().trim()
                        : "";


        if (newUsername.isBlank()) {

            throw new RuntimeException(
                    "Username is required."
            );

        }


        if (
                !user.getUsername()
                        .equals(newUsername)
                        &&
                        userRepository.existsByUsername(
                                newUsername
                        )
        ) {

            throw new RuntimeException(
                    "Username already exists."
            );

        }


        /*
         ==========================================
         EMAIL

         DUPLICATE EMAIL IS ALLOWED.

         Therefore there is intentionally NO
         existsByEmail() check here.
         ==========================================
         */

        if (
                employeeDTO.getEmail() == null
                        || employeeDTO.getEmail().isBlank()
        ) {

            throw new RuntimeException(
                    "Email is required."
            );

        }

        String newEmail =
                employeeDTO.getEmail().trim();


        /*
         ==========================================
         ROLE
         ==========================================
         */

        String roleName =
                employeeDTO.getRole();


        if (
                roleName == null
                        || roleName.isBlank()
        ) {

            roleName = "ROLE_EMPLOYEE";

        }


        roleName =
                roleName.trim().toUpperCase();


        if (!roleName.startsWith("ROLE_")) {

            roleName =
                    "ROLE_" + roleName;

        }


        final String finalRoleName = roleName;


        Role role =
                roleRepository
                        .findByName(finalRoleName)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Role not found: "
                                                + finalRoleName
                                )
                        );


        /*
         ==========================================
         UPDATE USER
         ==========================================
         */

        String firstName =
                employeeDTO.getFirstName() != null
                        ? employeeDTO.getFirstName().trim()
                        : "";


        String lastName =
                employeeDTO.getLastName() != null
                        ? employeeDTO.getLastName().trim()
                        : "";


        user.setName(
                (firstName + " " + lastName).trim()
        );


        user.setUsername(
                newUsername
        );


        user.setEmail(
                newEmail
        );


        /*
         ==========================================
         UPDATE PASSWORD
         ==========================================
         */

        if (
                employeeDTO.getPassword() != null
                        && !employeeDTO.getPassword().isBlank()
        ) {

            user.setPassword(
                    passwordEncoder.encode(
                            employeeDTO.getPassword()
                    )
            );

        }


        /*
         ==========================================
         UPDATE ROLE
         ==========================================
         */

        user.getRoles().clear();

        user.getRoles().add(role);


        userRepository.save(user);


        /*
         ==========================================
         UPDATE EMPLOYEE
         ==========================================
         */

        updateEmployeeFields(
                employee,
                employeeDTO
        );


        /*
         ==========================================
         UPDATE PROFILE IMAGE
         ==========================================
         */

        if (
                profileImage != null
                        && !profileImage.isEmpty()
        ) {

            /*
             --------------------------------------
             Delete old image
             --------------------------------------
             */

            if (
                    employee.getProfileImage() != null
                            && !employee.getProfileImage().isBlank()
            ) {

                fileStorageService.deleteFile(
                        employee.getProfileImage()
                );

            }


            /*
             --------------------------------------
             Save new image using EXISTING ID
             --------------------------------------
             */

            String imagePath =
                    fileStorageService
                            .saveEmployeeProfileImage(
                                    profileImage,
                                    employee.getId()
                            );


            employee.setProfileImage(
                    imagePath
            );

        }


        /*
         ==========================================
         SAVE
         ==========================================
         */

        Employee updatedEmployee =
                employeeRepository.save(
                        employee
                );


        /*
         ==========================================
         RETURN
         ==========================================
         */

        return mapToDTO(
                updatedEmployee
        );

    }


    /*
     ==========================================
     DELETE EMPLOYEE
     ==========================================
     */

    @Transactional
    public String deleteEmployee(
            Long id
    ) {

        Employee employee =
                employeeRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee not found."
                                )
                        );


        /*
         ==========================================
         DELETE PROFILE IMAGE
         ==========================================
         */

        if (
                employee.getProfileImage() != null
                        && !employee.getProfileImage().isBlank()
        ) {

            fileStorageService.deleteFile(
                    employee.getProfileImage()
            );

        }


        /*
         ==========================================
         DELETE EMPLOYEE
         ==========================================
         */

        employeeRepository.delete(
                employee
        );


        return "Employee deleted successfully.";

    }


    /*
     ==========================================
     MAP ENTITY -> DTO
     ==========================================
     */

    private EmployeeDTO mapToDTO(
            Employee employee
    ) {

        EmployeeDTO dto =
                new EmployeeDTO();


        dto.setId(
                employee.getId()
        );


        dto.setEmployeeCode(
                employee.getEmployeeCode()
        );


        dto.setFirstName(
                employee.getFirstName()
        );


        dto.setLastName(
                employee.getLastName()
        );


        dto.setEmail(
                employee.getEmail()
        );


        dto.setMobile(
                employee.getMobile()
        );


        dto.setDepartment(
                employee.getDepartment()
        );


        dto.setDesignation(
                employee.getDesignation()
        );


        dto.setStatus(
                employee.getStatus()
        );


        dto.setDateOfJoining(
                employee.getDateOfJoining()
        );


        dto.setSalary(
                employee.getSalary()
        );


        dto.setAddress(
                employee.getAddress()
        );


        dto.setCity(
                employee.getCity()
        );


        dto.setState(
                employee.getState()
        );


        dto.setCountry(
                employee.getCountry()
        );


        dto.setPincode(
                employee.getPincode()
        );


        /*
         ==========================================
         ADDITIONAL EMPLOYEE INFORMATION
         ==========================================
         */

        dto.setAlternateMobile(
                employee.getAlternateMobile()
        );


        dto.setAadhaarNumber(
                employee.getAadhaarNumber()
        );


        dto.setPanNumber(
                employee.getPanNumber()
        );


        dto.setEmergencyContactName(
                employee.getEmergencyContactName()
        );


        dto.setEmergencyContactNumber(
                employee.getEmergencyContactNumber()
        );


        dto.setBankName(
                employee.getBankName()
        );


        dto.setAccountHolderName(
                employee.getAccountHolderName()
        );


        dto.setAccountNumber(
                employee.getAccountNumber()
        );


        dto.setIfscCode(
                employee.getIfscCode()
        );


        dto.setNote(
                employee.getNote()
        );


        dto.setProfileImage(
                employee.getProfileImage()
        );


        /*
         ==========================================
         USER INFORMATION
         ==========================================
         */

        if (
                employee.getUser() != null
        ) {

            User user =
                    employee.getUser();


            dto.setUsername(
                    user.getUsername()
            );


            dto.setEmail(
                    user.getEmail()
            );


            dto.setRole(
                    user.getRoles()
                            .stream()
                            .findFirst()
                            .map(Role::getName)
                            .orElse(null)
            );


            /*
             --------------------------------------
             NEVER RETURN PASSWORD
             --------------------------------------
             */

            dto.setPassword(null);

        }


        return dto;

    }


    /*
     ==========================================
     COPY DTO -> EMPLOYEE
     ==========================================
     */

    private void updateEmployeeFields(
            Employee employee,
            EmployeeDTO dto
    ) {

        employee.setFirstName(
                dto.getFirstName()
        );


        employee.setLastName(
                dto.getLastName()
        );


        employee.setEmail(
                dto.getEmail()
        );


        employee.setMobile(
                dto.getMobile()
        );


        employee.setAlternateMobile(
                dto.getAlternateMobile()
        );


        employee.setAadhaarNumber(
                dto.getAadhaarNumber()
        );


        employee.setPanNumber(
                dto.getPanNumber()
        );


        employee.setEmergencyContactName(
                dto.getEmergencyContactName()
        );


        employee.setEmergencyContactNumber(
                dto.getEmergencyContactNumber()
        );


        employee.setBankName(
                dto.getBankName()
        );


        employee.setAccountHolderName(
                dto.getAccountHolderName()
        );


        employee.setAccountNumber(
                dto.getAccountNumber()
        );


        employee.setIfscCode(
                dto.getIfscCode()
        );


        employee.setNote(
                dto.getNote()
        );


        employee.setDepartment(
                dto.getDepartment()
        );


        employee.setDesignation(
                dto.getDesignation()
        );


        employee.setStatus(
                dto.getStatus()
        );


        employee.setDateOfJoining(
                dto.getDateOfJoining()
        );


        employee.setSalary(
                dto.getSalary()
        );


        employee.setAddress(
                dto.getAddress()
        );


        employee.setCity(
                dto.getCity()
        );


        employee.setState(
                dto.getState()
        );


        employee.setCountry(
                dto.getCountry()
        );


        employee.setPincode(
                dto.getPincode()
        );

    }


    /*
     ==========================================
     GENERATE EMPLOYEE CODE
     ==========================================
     */

    private String generateEmployeeCode() {

        Employee lastEmployee =
                employeeRepository
                        .findTopByOrderByIdDesc();


        if (lastEmployee == null) {

            return "POS-EMP-000001";

        }


        return String.format(
                "POS-EMP-%06d",
                lastEmployee.getId() + 1
        );

    }

}
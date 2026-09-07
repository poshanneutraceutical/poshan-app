package com.poshan.service;

import com.poshan.dto.TaskDTO;
import com.poshan.entity.Department;
import com.poshan.entity.Task;
import com.poshan.entity.Taskstatus;
import com.poshan.entity.User;
import com.poshan.entity.UserPosition;
import com.poshan.repository.TaskRepository;
import com.poshan.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    private final UserRepository userRepository;


    /*
    ==========================================
    CREATE TASK
    ==========================================
    */

    public TaskDTO createTask(TaskDTO taskDTO) {

        Task task = new Task();

        task.setTitle(
                taskDTO.getTitle()
        );

        task.setDescription(
                taskDTO.getDescription()
        );

        task.setAssignedBy(
                taskDTO.getAssignedBy()
        );

        task.setAssignedTo(
                taskDTO.getAssignedTo()
        );

        task.setAssignDate(
                taskDTO.getAssignDate()
        );

        task.setDueDate(
                taskDTO.getDueDate()
        );

        task.setDepartment(
                taskDTO.getDepartment()
        );

        task.setPriority(
                taskDTO.getPriority()
        );


        /*
        ==========================================
        NEW TASK = PENDING
        ==========================================
        */

        task.setStatus(
                Taskstatus.PENDING
        );


        Task savedTask =
                taskRepository.save(task);

        return mapToDTO(savedTask);
    }


    /*
    ==========================================
    GET TASKS BY DEPARTMENT
    ==========================================

    ADMIN:
    - Gets all tasks in the requested department.

    EMPLOYEE:
    - Can only request the department allowed
      by their position.
    - Gets ALL tasks belonging to that
      department.

    IMPORTANT:
    The assignedTo field is displayed as
    information about who the task was assigned
    to, but it does NOT hide the task from other
    employees in the same department.
    */

    public List<TaskDTO> getTasksByDepartment(
            String departmentName
    ) {

        Department department;

        try {

            department =
                    Department.valueOf(
                            departmentName.toUpperCase()
                    );

        } catch (IllegalArgumentException error) {

            throw new RuntimeException(
                    "Invalid department: "
                            + departmentName
            );

        }


        /*
        ==========================================
        GET AUTHENTICATION
        ==========================================
        */

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        if (
                authentication == null
                        || !authentication.isAuthenticated()
        ) {

            throw new RuntimeException(
                    "User is not authenticated."
            );

        }


        /*
        ==========================================
        CHECK ADMIN
        ==========================================
        */

        boolean isAdmin =
                authentication
                        .getAuthorities()
                        .stream()
                        .anyMatch(authority ->
                                authority
                                        .getAuthority()
                                        .equals("ROLE_ADMIN")
                        );


        /*
        ==========================================
        ADMIN
        ==========================================

        Admin can see all tasks for the
        requested department.
        */

        if (isAdmin) {

            return taskRepository
                    .findByDepartmentOrderByIdDesc(
                            department
                    )
                    .stream()
                    .map(this::mapToDTO)
                    .toList();

        }


        /*
        ==========================================
        GET CURRENT USER
        ==========================================
        */

        String username =
                authentication.getName();


        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Logged-in user not found."
                                )
                        );


        /*
        ==========================================
        GET USER POSITION
        ==========================================
        */

        UserPosition position =
                user.getPosition();


        if (position == null) {

            throw new RuntimeException(
                    "User position is not assigned."
            );

        }


        /*
        ==========================================
        POSITION -> DEPARTMENT
        ==========================================
        */

        Department allowedDepartment =
                getDepartmentForPosition(
                        position
                );


        /*
        ==========================================
        POSITIONS WITHOUT DEPARTMENTAL TASK ACCESS
        ==========================================
        */

        if (allowedDepartment == null) {

            throw new RuntimeException(
                    "Your position does not have access "
                            + "to departmental tasks."
            );

        }


        /*
        ==========================================
        SECURITY CHECK
        ==========================================

        Employee cannot request another
        department through the URL.

        Example:

        WEB_DEVELOPMENT employee
        -> WEB_DEVELOPMENT       ALLOWED
        -> DESIGN                 DENIED
        -> MARKETING              DENIED
        -> MRP_PRINTING           DENIED
        */

        if (department != allowedDepartment) {

            throw new RuntimeException(
                    "You do not have permission to access "
                            + "tasks for department: "
                            + department
            );

        }


        /*
        ==========================================
        GET ALL DEPARTMENT TASKS
        ==========================================

        IMPORTANT:

        We intentionally DO NOT filter by
        assignedTo / username here.

        Therefore:

        Aakash
        Monu
        Surjeet
        Dipesh

        can all see tasks belonging to their
        own department.

        The assignedTo field still shows who
        the task was assigned to.
        */

        return taskRepository
                .findByDepartmentOrderByIdDesc(
                        department
                )
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    /*
    ==========================================
    POSITION -> DEPARTMENT
    ==========================================
    */

    private Department getDepartmentForPosition(
            UserPosition position
    ) {

        return switch (position) {

            case WEB_DEVELOPMENT ->
                    Department.WEB_DEVELOPMENT;

            case DESIGN ->
                    Department.DESIGN;

            case MARKETING ->
                    Department.MARKETING;

            case MRP_PRINTING ->
                    Department.MRP_PRINTING;

            case LABOUR ->
                    null;

        };

    }


    /*
    ==========================================
    GET TASK BY ID
    ==========================================
    */

    public TaskDTO getTaskById(
            Long id
    ) {

        Task task =
                taskRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Task not found with id: "
                                                + id
                                )
                        );

        return mapToDTO(task);
    }


    /*
    ==========================================
    GET ALL TASKS
    ==========================================
    */

    public List<TaskDTO> getAllTasks() {

        return taskRepository
                .findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    /*
    ==========================================
    UPDATE TASK
    ==========================================
    */

    public TaskDTO updateTask(
            Long id,
            TaskDTO taskDTO
    ) {

        Task task =
                taskRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Task not found with id: "
                                                + id
                                )
                        );


        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        if (
                authentication == null
                        || !authentication.isAuthenticated()
        ) {

            throw new RuntimeException(
                    "User is not authenticated."
            );

        }


        /*
        ==========================================
        GET LOGGED-IN USER ROLE
        ==========================================
        */

        boolean isAdmin =
                authentication
                        .getAuthorities()
                        .stream()
                        .anyMatch(authority ->
                                authority
                                        .getAuthority()
                                        .equals("ROLE_ADMIN")
                        );


        boolean isEmployee =
                authentication
                        .getAuthorities()
                        .stream()
                        .anyMatch(authority ->
                                authority
                                        .getAuthority()
                                        .equals("ROLE_EMPLOYEE")
                        );


        /*
        ==========================================
        ADMIN UPDATE
        ==========================================
        */

        if (isAdmin) {

            task.setTitle(
                    taskDTO.getTitle()
            );

            task.setDescription(
                    taskDTO.getDescription()
            );

            task.setAssignedBy(
                    taskDTO.getAssignedBy()
            );

            task.setAssignedTo(
                    taskDTO.getAssignedTo()
            );

            task.setDepartment(
                    taskDTO.getDepartment()
            );

            task.setPriority(
                    taskDTO.getPriority()
            );

            task.setAssignDate(
                    taskDTO.getAssignDate()
            );

            task.setDueDate(
                    taskDTO.getDueDate()
            );

        }


        /*
        ==========================================
        EMPLOYEE UPDATE
        ==========================================

        Employee can change ONLY status.
        */

        else if (isEmployee) {

            if (taskDTO.getStatus() == null) {

                throw new RuntimeException(
                        "Status is required."
                );

            }


            task.setStatus(
                    taskDTO.getStatus()
            );

        }


        /*
        ==========================================
        UNKNOWN ROLE
        ==========================================
        */

        else {

            throw new RuntimeException(
                    "You do not have permission to edit tasks."
            );

        }


        Task updatedTask =
                taskRepository.save(task);

        return mapToDTO(updatedTask);
    }


    /*
    ==========================================
    DELETE TASK
    ==========================================
    */

    public void deleteTask(
            Long id
    ) {

        if (
                !taskRepository.existsById(id)
        ) {

            throw new RuntimeException(
                    "Task not found with id: "
                            + id
            );

        }

        taskRepository.deleteById(id);
    }


    /*
    ==========================================
    MAP ENTITY -> DTO
    ==========================================
    */

    private TaskDTO mapToDTO(
            Task task
    ) {

        TaskDTO dto =
                new TaskDTO();

        dto.setId(
                task.getId()
        );

        dto.setTitle(
                task.getTitle()
        );

        dto.setDescription(
                task.getDescription()
        );

        dto.setAssignedBy(
                task.getAssignedBy()
        );

        dto.setAssignedTo(
                task.getAssignedTo()
        );

        dto.setDepartment(
                task.getDepartment()
        );

        dto.setPriority(
                task.getPriority()
        );

        dto.setDueDate(
                task.getDueDate()
        );

        dto.setAssignDate(
                task.getAssignDate()
        );

        dto.setStatus(
                task.getStatus()
        );

        return dto;
    }

}
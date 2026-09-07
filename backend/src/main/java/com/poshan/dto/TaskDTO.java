package com.poshan.dto;

import com.poshan.entity.AssignedBy;
import com.poshan.entity.Department;
import com.poshan.entity.preority;
import com.poshan.entity.Taskstatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDTO {

    private Long id;

    /*
     ==========================================
     TASK TITLE
     ==========================================

     Validation is intentionally NOT placed here.

     Why?

     ADMIN creates/updates the complete task,
     while EMPLOYEE updates only the status.

     Therefore an employee request can legally be:

     {
         "status": "COMPLETE"
     }

     Backend TaskService handles the permission
     and field restrictions.
     */

    private String title;


    /*
     ==========================================
     DESCRIPTION
     ==========================================
     */

    private String description;


    /*
     ==========================================
     ASSIGNED BY
     ==========================================
     */

    private AssignedBy assignedBy;


    /*
     ==========================================
     ASSIGNED TO
     ==========================================
     */

    private String assignedTo;


    /*
     ==========================================
     DEPARTMENT
     ==========================================
     */

    private Department department;


    /*
     ==========================================
     PRIORITY
     ==========================================
     */

    private preority priority;


    /*
     ==========================================
     DUE DATE
     ==========================================
     */

    private LocalDateTime dueDate;


    /*
     ==========================================
     ASSIGN DATE
     ==========================================
     */

    private LocalDateTime assignDate;


    /*
     ==========================================
     STATUS
     ==========================================
     */

    private Taskstatus status;

}
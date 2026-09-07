package com.poshan.entity;



import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;



import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "tasks")
public class Task {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "task name is required")
    private String title;

    private String description;
    @Enumerated(EnumType.STRING)
    private AssignedBy assignedBy = AssignedBy.ADMIN;

    private String assignedTo;

    @Enumerated(EnumType.STRING)
    private Department department = Department.MARKETING;

    @Enumerated(EnumType.STRING)
    private preority priority = preority.LOW;

    private LocalDateTime dueDate ;

    private LocalDateTime assignDate;
    @Enumerated(EnumType.STRING)
    private Taskstatus status = Taskstatus.PENDING;




}

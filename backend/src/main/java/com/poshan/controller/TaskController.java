package com.poshan.controller;

import com.poshan.dto.TaskDTO;
import com.poshan.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;


    /*
     ==========================================
     CREATE TASK
     ==========================================
     */

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(
            @Valid @RequestBody TaskDTO taskDTO
    ) {

        if (taskDTO == null) {

            return new ResponseEntity<>(
                    HttpStatus.BAD_REQUEST
            );

        }

        return new ResponseEntity<>(
                taskService.createTask(taskDTO),
                HttpStatus.CREATED
        );
    }


    @GetMapping("/department/{department}")
    public ResponseEntity<List<TaskDTO>> getTasksByDepartment(
            @PathVariable String department
    ) {

        return ResponseEntity.ok(
                taskService.getTasksByDepartment(
                        department
                )
        );
    }

    /*
     ==========================================
      GET TASK BY ID
     ==========================================
     */

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                taskService.getTaskById(id)
        );
    }

    /*
     ==========================================
     GET ALL TASKS
     ==========================================
     */

    @GetMapping("/")
    public ResponseEntity<List<TaskDTO>> getAllTasks() {

        return ResponseEntity.ok(
                taskService.getAllTasks()
        );
    }

    /*
     ==========================================
     UPDATE TASK
     ==========================================
     */

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskDTO taskDTO
    ) {

        return ResponseEntity.ok(
                taskService.updateTask(
                        id,
                        taskDTO
                )
        );
    }


    /*
     ==========================================
     DELETE TASK
     ==========================================
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long id
    ) {

        taskService.deleteTask(id);

        return ResponseEntity.ok(
                "TASK IS DELETED SUCCESSFULLY"
        );
    }

}
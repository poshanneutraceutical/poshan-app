package com.poshan.controller;


import com.poshan.dto.NotificationDTO;
import com.poshan.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {



    private final NotificationService notificationService;





    // CREATE NOTIFICATION

    @PostMapping
    public ResponseEntity<NotificationDTO> createNotification(
            @RequestBody NotificationDTO dto
    ){

        return ResponseEntity.ok(
                notificationService.createNotification(dto)
        );

    }







    // GET USER NOTIFICATIONS

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDTO>> getUserNotifications(
            @PathVariable Long userId
    ){

        return ResponseEntity.ok(
                notificationService.getUserNotifications(userId)
        );

    }








    // GET UNREAD COUNT

    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Long> getUnreadCount(
            @PathVariable Long userId
    ){

        return ResponseEntity.ok(
                notificationService.getUnreadCount(userId)
        );

    }








    // MARK AS READ

    @PutMapping("/{id}/read")
    public ResponseEntity<NotificationDTO> markAsRead(
            @PathVariable Long id
    ){

        return ResponseEntity.ok(
                notificationService.markAsRead(id)
        );

    }








    // DELETE NOTIFICATION

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(
            @PathVariable Long id
    ){

        notificationService.deleteNotification(id);


        return ResponseEntity.ok(
                "Notification deleted successfully"
        );

    }



}
package com.poshan.controller;

import com.poshan.dto.NotificationDTO;
import com.poshan.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /*
     * Kept for compatibility with the existing API.
     * Arbitrary/manual notifications are ADMIN-only.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NotificationDTO> createNotification(
            @RequestBody NotificationDTO dto
    ) {
        return ResponseEntity.ok(
                notificationService.createNotification(dto)
        );
    }

    /*
     * Every authenticated employee can access his/her own
     * notifications. Ownership is also verified inside the service.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDTO>> getUserNotifications(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(
                notificationService.getUserNotifications(userId)
        );
    }

    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Long> getUnreadCount(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(
                notificationService.getUnreadCount(userId)
        );
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<NotificationDTO> markAsRead(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                notificationService.markAsRead(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(
            @PathVariable Long id
    ) {
        notificationService.deleteNotification(id);

        return ResponseEntity.ok(
                "Notification deleted successfully"
        );
    }
}

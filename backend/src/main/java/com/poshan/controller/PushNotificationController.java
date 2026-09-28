package com.poshan.controller;

import com.poshan.dto.PushConfigDTO;
import com.poshan.dto.PushRegistrationRequest;
import com.poshan.service.PushNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/push")
@RequiredArgsConstructor
public class PushNotificationController {

    private final PushNotificationService pushNotificationService;

    @GetMapping("/config")
    public ResponseEntity<PushConfigDTO> getConfig() {
        return ResponseEntity.ok(
                pushNotificationService.getWebConfig()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(
            @RequestBody PushRegistrationRequest request
    ) {
        pushNotificationService.registerCurrentDevice(request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/register")
    public ResponseEntity<Void> unregister(
            @RequestBody PushRegistrationRequest request
    ) {
        pushNotificationService.unregisterCurrentDevice(request);
        return ResponseEntity.noContent().build();
    }
}

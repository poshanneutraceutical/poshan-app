package com.poshan.controller;

import com.poshan.dto.AttendanceWorkerDTO;
import com.poshan.dto.ManualAttendanceHistoryDTO;
import com.poshan.dto.ManualAttendancePersonDTO;
import com.poshan.dto.ManualAttendanceRequestDTO;
import com.poshan.service.ManualAttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/hr/manual-attendance")
@RequiredArgsConstructor
public class ManualAttendanceController {

    private final ManualAttendanceService manualAttendanceService;

    @GetMapping("/people")
    public ResponseEntity<List<ManualAttendancePersonDTO>> getPeople(
            @RequestParam(required = false) LocalDate date
    ) {
        return ResponseEntity.ok(
                manualAttendanceService.getPeople(date)
        );
    }

    @PostMapping("/mark")
    public ResponseEntity<ManualAttendanceHistoryDTO> markAttendance(
            @RequestBody ManualAttendanceRequestDTO request
    ) {
        return ResponseEntity.ok(
                manualAttendanceService.markAttendance(request)
        );
    }

    @PutMapping("/records/{id}")
    public ResponseEntity<ManualAttendanceHistoryDTO> updateAttendance(
            @PathVariable Long id,
            @RequestBody ManualAttendanceRequestDTO request
    ) {
        return ResponseEntity.ok(
                manualAttendanceService.updateAttendance(id, request)
        );
    }

    @DeleteMapping("/records")
    public ResponseEntity<Void> removeAttendance(
            @RequestParam String personType,
            @RequestParam Long personId,
            @RequestParam LocalDate date
    ) {
        manualAttendanceService.removeAttendance(
                personType,
                personId,
                date
        );
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/history/{personType}/{personId}")
    public ResponseEntity<List<ManualAttendanceHistoryDTO>> getHistory(
            @PathVariable String personType,
            @PathVariable Long personId
    ) {
        return ResponseEntity.ok(
                manualAttendanceService.getHistory(
                        personType,
                        personId
                )
        );
    }

    @GetMapping("/workers")
    public ResponseEntity<List<AttendanceWorkerDTO>> getWorkers() {
        return ResponseEntity.ok(
                manualAttendanceService.getWorkers()
        );
    }

    @PostMapping("/workers")
    public ResponseEntity<AttendanceWorkerDTO> createWorker(
            @RequestBody AttendanceWorkerDTO request
    ) {
        return ResponseEntity.ok(
                manualAttendanceService.createWorker(request)
        );
    }

    @PutMapping("/workers/{id}")
    public ResponseEntity<AttendanceWorkerDTO> updateWorker(
            @PathVariable Long id,
            @RequestBody AttendanceWorkerDTO request
    ) {
        return ResponseEntity.ok(
                manualAttendanceService.updateWorker(
                        id,
                        request
                )
        );
    }
}

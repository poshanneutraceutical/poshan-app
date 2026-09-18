package com.poshan.service;

import com.poshan.dto.AttendanceWorkerDTO;
import com.poshan.dto.ManualAttendanceHistoryDTO;
import com.poshan.dto.ManualAttendancePersonDTO;
import com.poshan.dto.ManualAttendanceRequestDTO;
import com.poshan.entity.AttendanceWorker;
import com.poshan.entity.Employee;
import com.poshan.entity.ManualAttendance;
import com.poshan.entity.ManualAttendanceStatus;
import com.poshan.repository.AttendanceWorkerRepository;
import com.poshan.repository.EmployeeRepository;
import com.poshan.repository.ManualAttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ManualAttendanceService {

    private static final ZoneId INDIA_ZONE = ZoneId.of("Asia/Kolkata");

    private final EmployeeRepository employeeRepository;
    private final AttendanceWorkerRepository attendanceWorkerRepository;
    private final ManualAttendanceRepository manualAttendanceRepository;

    public List<ManualAttendancePersonDTO> getPeople(LocalDate date) {
        LocalDate targetDate = date != null
                ? date
                : LocalDate.now(INDIA_ZONE);

        List<ManualAttendancePersonDTO> people = new ArrayList<>();

        for (Employee employee : employeeRepository.findAll()) {
            ManualAttendance attendance =
                    manualAttendanceRepository
                            .findByEmployeeAndAttendanceDate(employee, targetDate)
                            .orElse(null);

            ManualAttendancePersonDTO dto = new ManualAttendancePersonDTO();
            dto.setPersonType("EMPLOYEE");
            dto.setPersonId(employee.getId());
            dto.setName(buildEmployeeName(employee));
            dto.setEmail(employee.getEmail());
            dto.setMobile(employee.getMobile());
            dto.setEmployeeCode(employee.getEmployeeCode());
            dto.setDepartment(
                    employee.getDepartment() != null
                            ? employee.getDepartment().name()
                            : ""
            );
            dto.setStatus(
                    attendance != null
                            ? attendance.getStatus()
                            : null
            );
            dto.setAttendanceId(
                    attendance != null
                            ? attendance.getId()
                            : null
            );
            dto.setWorker(false);
            people.add(dto);
        }

        for (AttendanceWorker worker :
                attendanceWorkerRepository.findByActiveTrueOrderByNameAsc()) {

            ManualAttendance attendance =
                    manualAttendanceRepository
                            .findByWorkerAndAttendanceDate(worker, targetDate)
                            .orElse(null);

            ManualAttendancePersonDTO dto = new ManualAttendancePersonDTO();
            dto.setPersonType("WORKER");
            dto.setPersonId(worker.getId());
            dto.setName(worker.getName());
            dto.setEmail(worker.getEmail());
            dto.setMobile(worker.getMobile());
            dto.setDepartment(worker.getDepartment());
            dto.setNote(worker.getNote());
            dto.setStatus(
                    attendance != null
                            ? attendance.getStatus()
                            : null
            );
            dto.setAttendanceId(
                    attendance != null
                            ? attendance.getId()
                            : null
            );
            dto.setWorker(true);
            people.add(dto);
        }

        people.sort(
                Comparator.comparing(
                        ManualAttendancePersonDTO::getName,
                        String.CASE_INSENSITIVE_ORDER
                )
        );

        return people;
    }

    @Transactional
    public ManualAttendanceHistoryDTO markAttendance(
            ManualAttendanceRequestDTO request
    ) {
        validateAttendanceRequest(request);

        LocalDate date = request.getAttendanceDate() != null
                ? request.getAttendanceDate()
                : LocalDate.now(INDIA_ZONE);

        ManualAttendance attendance = findExisting(
                request.getPersonType(),
                request.getPersonId(),
                date
        );

        if (attendance == null) {
            attendance = new ManualAttendance();
            assignPerson(attendance, request.getPersonType(), request.getPersonId());
            attendance.setAttendanceDate(date);
        }

        attendance.setStatus(request.getStatus());

        return mapHistory(
                manualAttendanceRepository.save(attendance)
        );
    }

    @Transactional
    public ManualAttendanceHistoryDTO updateAttendance(
            Long attendanceId,
            ManualAttendanceRequestDTO request
    ) {
        if (attendanceId == null) {
            throw new RuntimeException("Attendance record ID is required.");
        }

        if (request == null || request.getStatus() == null) {
            throw new RuntimeException("Attendance status is required.");
        }

        ManualAttendance attendance =
                manualAttendanceRepository
                        .findById(attendanceId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Manual attendance record not found."
                                )
                        );

        attendance.setStatus(request.getStatus());

        if (request.getAttendanceDate() != null
                && !request.getAttendanceDate().equals(attendance.getAttendanceDate())) {

            ManualAttendance conflictingRecord =
                    findExisting(
                            attendance.getEmployee() != null
                                    ? "EMPLOYEE"
                                    : "WORKER",
                            attendance.getEmployee() != null
                                    ? attendance.getEmployee().getId()
                                    : attendance.getWorker().getId(),
                            request.getAttendanceDate()
                    );

            if (conflictingRecord != null
                    && !conflictingRecord.getId().equals(attendance.getId())) {
                throw new RuntimeException(
                        "Attendance already exists for this person on the selected date."
                );
            }

            attendance.setAttendanceDate(request.getAttendanceDate());
        }

        return mapHistory(
                manualAttendanceRepository.save(attendance)
        );
    }

    @Transactional
    public void removeAttendance(
            String personType,
            Long personId,
            LocalDate date
    ) {
        if (date == null) {
            throw new RuntimeException("Attendance date is required.");
        }

        ManualAttendance attendance = findExisting(
                personType,
                personId,
                date
        );

        if (attendance != null) {
            manualAttendanceRepository.delete(attendance);
        }
    }

    public List<ManualAttendanceHistoryDTO> getHistory(
            String personType,
            Long personId
    ) {
        String normalizedType = normalizePersonType(personType);

        if (personId == null) {
            throw new RuntimeException("Person ID is required.");
        }

        if ("EMPLOYEE".equals(normalizedType)) {
            Employee employee = getEmployee(personId);
            return manualAttendanceRepository
                    .findByEmployeeOrderByAttendanceDateDesc(employee)
                    .stream()
                    .map(this::mapHistory)
                    .toList();
        }

        AttendanceWorker worker = getWorker(personId);
        return manualAttendanceRepository
                .findByWorkerOrderByAttendanceDateDesc(worker)
                .stream()
                .map(this::mapHistory)
                .toList();
    }

    public List<AttendanceWorkerDTO> getWorkers() {
        return attendanceWorkerRepository
                .findByActiveTrueOrderByNameAsc()
                .stream()
                .map(this::mapWorker)
                .toList();
    }

    @Transactional
    public AttendanceWorkerDTO createWorker(
            AttendanceWorkerDTO request
    ) {
        validateWorker(request);

        AttendanceWorker worker = new AttendanceWorker();
        copyWorkerFields(worker, request);
        worker.setActive(true);

        return mapWorker(
                attendanceWorkerRepository.save(worker)
        );
    }

    @Transactional
    public AttendanceWorkerDTO updateWorker(
            Long id,
            AttendanceWorkerDTO request
    ) {
        validateWorker(request);

        AttendanceWorker worker =
                attendanceWorkerRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Worker not found."
                                )
                        );

        copyWorkerFields(worker, request);

        return mapWorker(
                attendanceWorkerRepository.save(worker)
        );
    }

    private void validateAttendanceRequest(
            ManualAttendanceRequestDTO request
    ) {
        if (request == null) {
            throw new RuntimeException("Attendance data is required.");
        }

        if (request.getPersonType() == null || request.getPersonType().isBlank()) {
            throw new RuntimeException("Person type is required.");
        }

        if (request.getPersonId() == null) {
            throw new RuntimeException("Person ID is required.");
        }

        if (request.getStatus() == null) {
            throw new RuntimeException("Attendance status is required.");
        }

        String type = normalizePersonType(request.getPersonType());

        if (!"EMPLOYEE".equals(type) && !"WORKER".equals(type)) {
            throw new RuntimeException("Person type must be EMPLOYEE or WORKER.");
        }
    }

    private String normalizePersonType(String personType) {
        return personType == null
                ? ""
                : personType.trim().toUpperCase();
    }

    private ManualAttendance findExisting(
            String personType,
            Long personId,
            LocalDate date
    ) {
        String type = normalizePersonType(personType);

        if ("EMPLOYEE".equals(type)) {
            return manualAttendanceRepository
                    .findByEmployeeAndAttendanceDate(
                            getEmployee(personId),
                            date
                    )
                    .orElse(null);
        }

        if ("WORKER".equals(type)) {
            return manualAttendanceRepository
                    .findByWorkerAndAttendanceDate(
                            getWorker(personId),
                            date
                    )
                    .orElse(null);
        }

        throw new RuntimeException("Person type must be EMPLOYEE or WORKER.");
    }

    private void assignPerson(
            ManualAttendance attendance,
            String personType,
            Long personId
    ) {
        String type = normalizePersonType(personType);

        if ("EMPLOYEE".equals(type)) {
            attendance.setEmployee(getEmployee(personId));
            attendance.setWorker(null);
            return;
        }

        if ("WORKER".equals(type)) {
            attendance.setWorker(getWorker(personId));
            attendance.setEmployee(null);
            return;
        }

        throw new RuntimeException("Person type must be EMPLOYEE or WORKER.");
    }

    private Employee getEmployee(Long id) {
        return employeeRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Employee not found.")
                );
    }

    private AttendanceWorker getWorker(Long id) {
        return attendanceWorkerRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Worker not found.")
                );
    }

    private String buildEmployeeName(Employee employee) {
        String first = employee.getFirstName() != null
                ? employee.getFirstName().trim()
                : "";
        String last = employee.getLastName() != null
                ? employee.getLastName().trim()
                : "";
        return (first + " " + last).trim();
    }

    private ManualAttendanceHistoryDTO mapHistory(
            ManualAttendance attendance
    ) {
        ManualAttendanceHistoryDTO dto =
                new ManualAttendanceHistoryDTO();

        dto.setId(attendance.getId());
        dto.setAttendanceDate(attendance.getAttendanceDate());
        dto.setStatus(attendance.getStatus());

        if (attendance.getEmployee() != null) {
            Employee employee = attendance.getEmployee();
            dto.setPersonType("EMPLOYEE");
            dto.setPersonId(employee.getId());
            dto.setName(buildEmployeeName(employee));
            dto.setEmail(employee.getEmail());
        } else if (attendance.getWorker() != null) {
            AttendanceWorker worker = attendance.getWorker();
            dto.setPersonType("WORKER");
            dto.setPersonId(worker.getId());
            dto.setName(worker.getName());
            dto.setEmail(worker.getEmail());
        }

        return dto;
    }

    private AttendanceWorkerDTO mapWorker(
            AttendanceWorker worker
    ) {
        AttendanceWorkerDTO dto = new AttendanceWorkerDTO();
        dto.setId(worker.getId());
        dto.setName(worker.getName());
        dto.setMobile(worker.getMobile());
        dto.setEmail(worker.getEmail());
        dto.setDepartment(worker.getDepartment());
        dto.setNote(worker.getNote());
        dto.setActive(worker.isActive());
        return dto;
    }

    private void validateWorker(
            AttendanceWorkerDTO request
    ) {
        if (request == null || request.getName() == null || request.getName().isBlank()) {
            throw new RuntimeException("Worker name is required.");
        }
    }

    private void copyWorkerFields(
            AttendanceWorker worker,
            AttendanceWorkerDTO request
    ) {
        worker.setName(request.getName().trim());
        worker.setMobile(
                request.getMobile() != null
                        ? request.getMobile().trim()
                        : ""
        );
        worker.setEmail(
                request.getEmail() != null
                        ? request.getEmail().trim()
                        : ""
        );
        worker.setDepartment(
                request.getDepartment() != null
                        ? request.getDepartment().trim()
                        : ""
        );
        worker.setNote(
                request.getNote() != null
                        ? request.getNote().trim()
                        : ""
        );
    }
}

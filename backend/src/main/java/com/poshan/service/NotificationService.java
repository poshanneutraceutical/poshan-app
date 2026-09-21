package com.poshan.service;

import com.poshan.dto.NotificationDTO;
import com.poshan.entity.Department;
import com.poshan.entity.Digital;
import com.poshan.entity.DesigningEntity;
import com.poshan.entity.Inventory;
import com.poshan.entity.Notification;
import com.poshan.entity.Task;
import com.poshan.entity.User;
import com.poshan.entity.UserPosition;
import com.poshan.entity.WebDevelopment;
import com.poshan.repository.NotificationRepository;
import com.poshan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private static final Logger log =
            LoggerFactory.getLogger(NotificationService.class);

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;


    /*
     =========================================================
     MANUAL / ADMIN NOTIFICATION CREATION
     =========================================================
     This existing endpoint is kept for compatibility.
     Only an ADMIN can create an arbitrary notification.
     =========================================================
     */
    @Transactional
    public NotificationDTO createNotification(
            NotificationDTO dto
    ) {

        User currentUser = getCurrentUser();

        if (!isAdmin(currentUser)) {
            throw new AccessDeniedException(
                    "Only an administrator can create manual notifications."
            );
        }

        User user =
                userRepository.findById(dto.getUserId())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        Notification notification =
                Notification.builder()
                        .title(dto.getTitle())
                        .message(dto.getMessage())
                        .type(dto.getType())
                        .user(user)
                        .isRead(false)
                        .targetType(dto.getTargetType())
                        .targetId(dto.getTargetId())
                        .build();

        Notification saved =
                notificationRepository.save(notification);

        return mapToDTO(saved);
    }


    /*
     =========================================================
     TASK CREATED
     =========================================================
     Rules:

     1. Every ADMIN receives the notification.
     2. If assignedTo matches a user, that exact user receives it.
     3. If no exact employee can be resolved, all users in the
        task's department receive it.

     This means an Aakash task does NOT automatically notify
     every Web Development employee when Aakash can be resolved.
     =========================================================
     */
    @Transactional
    public void createTaskCreatedNotifications(Task task) {

        if (task == null || task.getId() == null) {
            return;
        }

        try {

            UserPosition departmentPosition =
                    positionForDepartment(task.getDepartment());

            String taskName =
                    safeText(
                            task.getTitle(),
                            "New task"
                    );

            String assignedReference =
                    safeText(task.getAssignedTo(), "");

            User assignee =
                    findUserByReference(assignedReference);

            List<User> recipients =
                    resolveRecipients(
                            assignedReference,
                            departmentPosition
                    );

            if (recipients.isEmpty()) {
                return;
            }

            String assignedName =
                    assignee != null
                            ? safeText(
                            assignee.getName(),
                            assignee.getUsername()
                    )
                            : assignedReference;

            List<Notification> notifications =
                    new ArrayList<>();

            for (User recipient : recipients) {

                boolean isAssignee =
                        assignee != null
                                && Objects.equals(
                                recipient.getId(),
                                assignee.getId()
                        );

                String title =
                        isAssignee
                                ? "New Task Assigned"
                                : "New Task Created";

                String message;

                if (isAssignee) {

                    message =
                            "You were assigned a new task: "
                                    + taskName;

                } else if (isAdmin(recipient)) {

                    if (assignee != null) {

                        message =
                                "A new task \""
                                        + taskName
                                        + "\" was created and assigned to "
                                        + assignedName
                                        + ".";

                    } else {

                        message =
                                "A new task \""
                                        + taskName
                                        + "\" was created.";

                    }

                } else {

                    message =
                            "A new task was created for your module: "
                                    + taskName;

                }

                notifications.add(
                        buildNotification(
                                recipient,
                                title,
                                message,
                                "TASK_CREATED",
                                "TASK",
                                task.getId()
                        )
                );
            }

            notificationRepository.saveAll(notifications);

        } catch (Exception error) {

            log.error(
                    "Unable to create task notifications for task {}",
                    task.getId(),
                    error
            );
        }
    }


    /*
     =========================================================
     DESIGN PROJECT CREATED
     =========================================================
     */
    @Transactional
    public void createDesignProjectNotifications(
            DesigningEntity project
    ) {

        createProjectNotifications(
                project == null ? null : project.getId(),
                project == null ? null : project.getProjectname(),
                project == null ? null : project.getAssignto(),
                UserPosition.DESIGN,
                "Designing",
                "DESIGN_PROJECT"
        );
    }


    /*
     =========================================================
     DIGITAL MARKETING PROJECT CREATED
     =========================================================
     */
    @Transactional
    public void createDigitalProjectNotifications(
            Digital project
    ) {

        createProjectNotifications(
                project == null ? null : project.getId(),
                project == null ? null : project.getProjectname(),
                project == null ? null : project.getAssignto(),
                UserPosition.MARKETING,
                "Digital Marketing",
                "DIGITAL_MARKETING_PROJECT"
        );
    }


    /*
     =========================================================
     WEB DEVELOPMENT PROJECT CREATED
     =========================================================
     */
    @Transactional
    public void createWebProjectNotifications(
            WebDevelopment project
    ) {

        createProjectNotifications(
                project == null ? null : project.getId(),
                project == null ? null : project.getProjectname(),
                project == null ? null : project.getAssigndeveloper(),
                UserPosition.WEB_DEVELOPMENT,
                "Web Development",
                "WEB_DEVELOPMENT_PROJECT"
        );
    }


    private void createProjectNotifications(
            Long projectId,
            String projectName,
            String assignedReference,
            UserPosition modulePosition,
            String moduleLabel,
            String targetType
    ) {

        if (projectId == null) {
            return;
        }

        try {

            String safeProjectName =
                    safeText(projectName, "Untitled Project");

            String safeAssignedReference =
                    safeText(assignedReference, "");

            User assignee =
                    findUserByReference(
                            safeAssignedReference
                    );

            List<User> recipients =
                    resolveRecipients(
                            safeAssignedReference,
                            modulePosition
                    );

            if (recipients.isEmpty()) {
                return;
            }

            String assignedName =
                    assignee != null
                            ? safeText(
                            assignee.getName(),
                            assignee.getUsername()
                    )
                            : safeAssignedReference;

            List<Notification> notifications =
                    new ArrayList<>();

            for (User recipient : recipients) {

                boolean isAssignee =
                        assignee != null
                                && Objects.equals(
                                recipient.getId(),
                                assignee.getId()
                        );

                String title =
                        isAssignee
                                ? "New " + moduleLabel + " Project Assigned"
                                : "New " + moduleLabel + " Project";

                String message;

                if (isAssignee) {

                    message =
                            "You were assigned a new "
                                    + moduleLabel
                                    + " project: "
                                    + safeProjectName;

                } else if (isAdmin(recipient)) {

                    if (assignee != null) {

                        message =
                                "A new "
                                        + moduleLabel
                                        + " project \""
                                        + safeProjectName
                                        + "\" was created and assigned to "
                                        + assignedName
                                        + ".";

                    } else {

                        message =
                                "A new "
                                        + moduleLabel
                                        + " project \""
                                        + safeProjectName
                                        + "\" was created.";

                    }

                } else {

                    message =
                            "A new "
                                    + moduleLabel
                                    + " project was created for your module: "
                                    + safeProjectName;

                }

                notifications.add(
                        buildNotification(
                                recipient,
                                title,
                                message,
                                "PROJECT_CREATED",
                                targetType,
                                projectId
                        )
                );
            }

            notificationRepository.saveAll(notifications);

        } catch (Exception error) {

            log.error(
                    "Unable to create {} project notifications for project {}",
                    moduleLabel,
                    projectId,
                    error
            );
        }
    }


    private Notification buildNotification(
            User recipient,
            String title,
            String message,
            String type,
            String targetType,
            Long targetId
    ) {

        return Notification.builder()
                .title(title)
                .message(message)
                .type(type)
                .user(recipient)
                .isRead(false)
                .targetType(targetType)
                .targetId(targetId)
                .build();
    }


    private List<User> resolveRecipients(
            String assignedReference,
            UserPosition modulePosition
    ) {

        Map<Long, User> recipients =
                new LinkedHashMap<>();

        /* ADMIN always receives the notification. */
        for (User user : userRepository.findAll()) {

            if (isAdmin(user) && user.getId() != null) {
                recipients.put(user.getId(), user);
            }
        }

        User assignee =
                findUserByReference(assignedReference);

        if (assignee != null && assignee.getId() != null) {

            recipients.put(
                    assignee.getId(),
                    assignee
            );

            return new ArrayList<>(recipients.values());
        }

        /*
         * No exact employee was found.
         * In that case notify the complete module/department so that
         * a module-level project/task is still visible to its team.
         */
        if (modulePosition != null) {

            for (User user : userRepository.findAll()) {

                if (
                        user.getId() != null
                                && user.getPosition() == modulePosition
                ) {

                    recipients.put(
                            user.getId(),
                            user
                    );
                }
            }
        }

        return new ArrayList<>(recipients.values());
    }


    private User findUserByReference(
            String reference
    ) {

        String normalizedReference =
                normalize(reference);

        if (normalizedReference.isBlank()) {
            return null;
        }

        List<User> users =
                userRepository.findAll();

        /* Exact username / email / name first. */
        for (User user : users) {

            if (
                    normalizedReference.equals(
                            normalize(user.getUsername())
                    )
            ) {
                return user;
            }

            if (
                    normalizedReference.equals(
                            normalize(user.getEmail())
                    )
            ) {
                return user;
            }

            if (
                    normalizedReference.equals(
                            normalize(user.getName())
                    )
            ) {
                return user;
            }
        }

        /*
         * Then support common input such as "Aakash" when the actual
         * stored name is "Aakash Kumar".
         */
        for (User user : users) {

            String name =
                    normalize(user.getName());

            String username =
                    normalize(user.getUsername());

            if (
                    (!name.isBlank() && name.contains(normalizedReference))
                            ||
                            (!username.isBlank() && username.contains(normalizedReference))
            ) {

                return user;
            }
        }

        return null;
    }


    private UserPosition positionForDepartment(
            Department department
    ) {

        if (department == null) {
            return null;
        }

        return switch (department) {
            case WEB_DEVELOPMENT -> UserPosition.WEB_DEVELOPMENT;
            case DESIGN -> UserPosition.DESIGN;
            case MARKETING -> UserPosition.MARKETING;
            case MRP_PRINTING -> UserPosition.MRP_PRINTING;
            default -> null;
        };
    }


    private boolean isAdmin(User user) {

        if (user == null || user.getRoles() == null) {
            return false;
        }

        return user.getRoles()
                .stream()
                .anyMatch(
                        role ->
                                role != null
                                        && role.getName() != null
                                        && "ADMIN".equalsIgnoreCase(
                                        role.getName()
                                                .replaceFirst(
                                                        "^ROLE_",
                                                        ""
                                                )
                                                .trim()
                                )
                );
    }


    /*
     =========================================================
     READ / COUNT / READ STATUS
     =========================================================
     */
    public List<NotificationDTO> getUserNotifications(
            Long userId
    ) {

        validateUserAccess(userId);

        User user =
                userRepository.findById(userId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        return notificationRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    public long getUnreadCount(
            Long userId
    ) {

        validateUserAccess(userId);

        User user =
                userRepository.findById(userId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        return notificationRepository
                .countByUserAndIsReadFalse(user);
    }


    @Transactional
    public NotificationDTO markAsRead(
            Long id
    ) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Notification not found"
                                )
                        );

        validateUserAccess(
                notification.getUser().getId()
        );

        notification.setRead(true);

        Notification updated =
                notificationRepository.save(notification);

        return mapToDTO(updated);
    }


    @Transactional
    public void deleteNotification(
            Long id
    ) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Notification not found"
                                )
                        );

        validateUserAccess(
                notification.getUser().getId()
        );

        notificationRepository.delete(notification);
    }


    /*
     =========================================================
     EXISTING LOW STOCK NOTIFICATION
     =========================================================
     */
    @Transactional
    public void createLowStockNotification(
            Inventory inventory
    ) {

        if (inventory == null) {
            return;
        }

        List<User> admins =
                userRepository.findAll()
                        .stream()
                        .filter(this::isAdmin)
                        .toList();

        for (User admin : admins) {

            Notification notification =
                    Notification.builder()
                            .title("Low Stock Alert")
                            .message(
                                    inventory.getBoxType()
                                            + " stock is low. Available: "
                                            + inventory.getAvailableQuantity()
                                            + ", Minimum required: "
                                            + inventory.getMinimumQuantity()
                            )
                            .type("LOW_STOCK")
                            .user(admin)
                            .isRead(false)
                            .build();

            notificationRepository.save(notification);
        }
    }


    private NotificationDTO mapToDTO(
            Notification notification
    ) {

        NotificationDTO dto =
                new NotificationDTO();

        dto.setId(notification.getId());
        dto.setTitle(notification.getTitle());
        dto.setMessage(notification.getMessage());
        dto.setType(notification.getType());
        dto.setRead(notification.isRead());
        dto.setCreatedAt(notification.getCreatedAt());
        dto.setTargetType(notification.getTargetType());
        dto.setTargetId(notification.getTargetId());

        if (notification.getUser() != null) {

            dto.setUserId(
                    notification.getUser().getId()
            );

            dto.setUsername(
                    notification.getUser().getUsername()
            );
        }

        return dto;
    }


    private void validateUserAccess(
            Long requestedUserId
    ) {

        User currentUser =
                getCurrentUser();

        if (
                !isAdmin(currentUser)
                        && !Objects.equals(
                        currentUser.getId(),
                        requestedUserId
                )
        ) {

            throw new AccessDeniedException(
                    "You do not have permission to access these notifications."
            );
        }
    }


    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (
                authentication == null
                        || !authentication.isAuthenticated()
        ) {

            throw new AccessDeniedException(
                    "User is not authenticated."
            );
        }

        return userRepository
                .findByUsername(authentication.getName())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Logged-in user not found."
                        )
                );
    }


    private String normalize(String value) {

        if (value == null) {
            return "";
        }

        return value
                .trim()
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]", "");
    }


    private String safeText(
            String value,
            String fallback
    ) {

        if (value == null || value.isBlank()) {
            return fallback;
        }

        return value.trim();
    }
}

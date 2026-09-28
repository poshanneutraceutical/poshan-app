package com.poshan.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.SendResponse;
import com.poshan.dto.PushConfigDTO;
import com.poshan.dto.PushRegistrationRequest;
import com.poshan.entity.Notification;
import com.poshan.entity.PushDevice;
import com.poshan.entity.User;
import com.poshan.repository.PushDeviceRepository;
import com.poshan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PushNotificationService {

    private static final Logger log =
            LoggerFactory.getLogger(
                    PushNotificationService.class
            );

    private static final int MAX_MESSAGES_PER_BATCH = 500;


    /*
     =========================================================
     REPOSITORIES
     =========================================================
     */

    private final PushDeviceRepository
            pushDeviceRepository;

    private final UserRepository
            userRepository;


    /*
     =========================================================
     FIREBASE CONFIGURATION
     =========================================================
     */

    @Value("${firebase.push.enabled:false}")
    private boolean pushEnabled;


    @Value("${firebase.web.api-key:}")
    private String apiKey;


    @Value("${firebase.web.auth-domain:}")
    private String authDomain;


    @Value("${firebase.web.project-id:}")
    private String projectId;


    @Value("${firebase.web.storage-bucket:}")
    private String storageBucket;


    @Value("${firebase.web.messaging-sender-id:}")
    private String messagingSenderId;


    @Value("${firebase.web.app-id:}")
    private String appId;


    @Value("${firebase.web.vapid-key:}")
    private String vapidKey;


    /*
     =========================================================
     FIREBASE APPLICATION INSTANCE
     =========================================================
     */

    private volatile FirebaseApp firebaseApp;


    /*
     =========================================================
     REGISTER CURRENT DEVICE
     =========================================================
     */

    @Transactional
    public void registerCurrentDevice(
            PushRegistrationRequest request
    ) {

        User currentUser =
                getCurrentUser();


        String fid =
                request == null
                        ? null
                        : request.getFid();


        if (
                fid == null
                        || fid.isBlank()
        ) {

            throw new IllegalArgumentException(
                    "Push installation ID is required."
            );
        }


        fid =
                fid.trim();


        final String normalizedFid =
                fid;


        PushDevice device =
                pushDeviceRepository
                        .findByFid(
                                normalizedFid
                        )
                        .orElseGet(
                                PushDevice::new
                        );


        device.setUser(
                currentUser
        );


        device.setFid(
                normalizedFid
        );


        device.setLastSeenAt(
                LocalDateTime.now()
        );


        pushDeviceRepository.save(
                device
        );
    }


    /*
     =========================================================
     UNREGISTER CURRENT DEVICE
     =========================================================
     */

    @Transactional
    public void unregisterCurrentDevice(
            PushRegistrationRequest request
    ) {

        User currentUser =
                getCurrentUser();


        String fid =
                request == null
                        ? null
                        : request.getFid();


        if (
                fid == null
                        || fid.isBlank()
        ) {

            return;
        }


        pushDeviceRepository
                .findByFid(
                        fid.trim()
                )
                .ifPresent(
                        device -> {

                            if (
                                    device.getUser() == null
                                            ||
                                            device.getUser().getId() == null
                                            ||
                                            !Objects.equals(
                                                    device.getUser().getId(),
                                                    currentUser.getId()
                                            )
                            ) {

                                throw new AccessDeniedException(
                                        "You do not have permission to remove this push device."
                                );
                            }


                            pushDeviceRepository.delete(
                                    device
                            );
                        }
                );
    }


    /*
     =========================================================
     WEB FIREBASE CONFIG
     =========================================================
     */

    public PushConfigDTO getWebConfig() {

        return new PushConfigDTO(
                apiKey,
                authDomain,
                projectId,
                storageBucket,
                messagingSenderId,
                appId,
                vapidKey
        );
    }


    /*
     =========================================================
     SEND PUSH NOTIFICATIONS
     =========================================================

     Sends push notifications for already-persisted ERP
     notifications.

     Push delivery failures are intentionally swallowed/logged
     so a phone notification problem never breaks the ERP
     database transaction.
     =========================================================
     */

    public void sendPushNotifications(
            List<Notification> notifications
    ) {

        if (
                !pushEnabled
                        ||
                        notifications == null
                        ||
                        notifications.isEmpty()
        ) {

            return;
        }


        try {

            FirebaseMessaging firebaseMessaging =
                    FirebaseMessaging.getInstance(
                            getFirebaseApp()
                    );


            /*
             =================================================
             FIND USER IDS
             =================================================
             */

            List<Long> userIds =
                    notifications
                            .stream()
                            .map(
                                    notification ->
                                            notification == null
                                                    ||
                                                    notification.getUser() == null
                                                    ? null
                                                    : notification
                                                    .getUser()
                                                    .getId()
                            )
                            .filter(
                                    Objects::nonNull
                            )
                            .distinct()
                            .toList();


            if (
                    userIds.isEmpty()
            ) {

                return;
            }


            /*
             =================================================
             LOAD DEVICES
             =================================================
             */

            List<PushDevice> devices =
                    pushDeviceRepository
                            .findByUserIdIn(
                                    userIds
                            );


            if (
                    devices.isEmpty()
            ) {

                return;
            }


            /*
             =================================================
             GROUP DEVICES BY USER
             =================================================
             */

            Map<Long, List<PushDevice>>
                    devicesByUser =
                    new HashMap<>();


            for (
                    PushDevice device
                    : devices
            ) {

                if (
                        device == null
                                ||
                                device.getUser() == null
                                ||
                                device.getUser().getId() == null
                ) {

                    continue;
                }


                devicesByUser
                        .computeIfAbsent(
                                device
                                        .getUser()
                                        .getId(),
                                ignored ->
                                        new ArrayList<>()
                        )
                        .add(device);
            }


            /*
             =================================================
             CREATE FIREBASE MESSAGES

             IMPORTANT:

             We keep the FID in a separate list because
             Message.getFid() is not publicly accessible in
             the Firebase Admin SDK.
             =================================================
             */

            List<Message> messages =
                    new ArrayList<>();


            List<String> messageFids =
                    new ArrayList<>();


            for (
                    Notification notification
                    : notifications
            ) {

                if (
                        notification == null
                                ||
                                notification.getUser() == null
                                ||
                                notification.getUser().getId() == null
                ) {

                    continue;
                }


                List<PushDevice> userDevices =
                        devicesByUser.get(
                                notification
                                        .getUser()
                                        .getId()
                        );


                if (
                        userDevices == null
                                ||
                                userDevices.isEmpty()
                ) {

                    continue;
                }


                for (
                        PushDevice device
                        : userDevices
                ) {

                    if (
                            device == null
                                    ||
                                    device.getFid() == null
                                    ||
                                    device.getFid().isBlank()
                    ) {

                        continue;
                    }


                    String fid =
                            device.getFid().trim();


                    Message message =
                            Message
                                    .builder()

                                    /*
                                     ---------------------------------
                                     TITLE
                                     ---------------------------------
                                     */

                                    .putData(
                                            "title",
                                            safe(
                                                    notification
                                                            .getTitle(),
                                                    "POSHAN ERP"
                                            )
                                    )

                                    /*
                                     ---------------------------------
                                     BODY
                                     ---------------------------------
                                     */

                                    .putData(
                                            "body",
                                            safe(
                                                    notification
                                                            .getMessage(),
                                                    "You have a new notification."
                                            )
                                    )

                                    /*
                                     ---------------------------------
                                     URL
                                     ---------------------------------
                                     */

                                    .putData(
                                            "url",
                                            resolveNotificationUrl(
                                                    notification
                                            )
                                    )

                                    /*
                                     ---------------------------------
                                     NOTIFICATION TYPE
                                     ---------------------------------
                                     */

                                    .putData(
                                            "type",
                                            safe(
                                                    notification
                                                            .getType(),
                                                    "NOTIFICATION"
                                            )
                                    )

                                    /*
                                     ---------------------------------
                                     TARGET INFORMATION
                                     ---------------------------------
                                     */

                                    .putData(
                                            "targetType",
                                            safe(
                                                    notification
                                                            .getTargetType(),
                                                    ""
                                            )
                                    )

                                    .putData(
                                            "targetId",
                                            notification
                                                    .getTargetId()
                                                    == null
                                                    ? ""
                                                    : String.valueOf(
                                                    notification
                                                            .getTargetId()
                                            )
                                    )

                                    /*
                                     ---------------------------------
                                     FIREBASE INSTALLATION ID
                                     ---------------------------------
                                     */

                                    .setFid(
                                            fid
                                    )

                                    .build();


                    /*
                     * Keep Message and FID at the same index.
                     */

                    messages.add(
                            message
                    );


                    messageFids.add(
                            fid
                    );
                }
            }


            if (
                    messages.isEmpty()
            ) {

                return;
            }


            /*
             =================================================
             SEND IN BATCHES
             =================================================
             */

            for (
                    int start = 0;
                    start < messages.size();
                    start += MAX_MESSAGES_PER_BATCH
            ) {

                int end =
                        Math.min(
                                start
                                        + MAX_MESSAGES_PER_BATCH,
                                messages.size()
                        );


                List<Message> batch =
                        messages.subList(
                                start,
                                end
                        );


                List<String> batchFids =
                        messageFids.subList(
                                start,
                                end
                        );


                BatchResponse response =
                        firebaseMessaging.sendEach(
                                batch
                        );


                log.info(
                        "POSHAN push batch completed: success={}, failure={}",
                        response.getSuccessCount(),
                        response.getFailureCount()
                );


                /*
                 * Clean invalid Firebase installations.
                 */

                removeInvalidFids(
                        batchFids,
                        response
                );
            }


        } catch (Exception error) {

            log.error(
                    "Unable to send POSHAN push notifications.",
                    error
            );
        }
    }


    /*
     =========================================================
     REMOVE INVALID FIDS
     =========================================================
     */

    private void removeInvalidFids(
            List<String> fids,
            BatchResponse response
    ) {

        if (
                fids == null
                        ||
                        response == null
        ) {

            return;
        }


        try {

            List<SendResponse> responses =
                    response.getResponses();


            if (
                    responses == null
            ) {

                return;
            }


            Set<String> invalidFids =
                    new HashSet<>();


            /*
             =================================================
             EACH RESPONSE HAS THE SAME INDEX AS THE MESSAGE
             =================================================
             */

            for (
                    int index = 0;
                    index < responses.size()
                            &&
                            index < fids.size();
                    index++
            ) {

                SendResponse sendResponse =
                        responses.get(
                                index
                        );


                if (
                        sendResponse == null
                                ||
                                sendResponse.isSuccessful()
                ) {

                    continue;
                }


                FirebaseMessagingException exception =
                        sendResponse.getException();


                if (
                        exception == null
                                ||
                                exception
                                        .getMessagingErrorCode()
                                        == null
                ) {

                    continue;
                }


                String code =
                        exception
                                .getMessagingErrorCode()
                                .name()
                                .toUpperCase(
                                        Locale.ROOT
                                );


                /*
                 =================================================
                 REMOVE INVALID / EXPIRED INSTALLATIONS
                 =================================================
                 */

                if (
                        "UNREGISTERED".equals(
                                code
                        )
                                ||
                                "INVALID_ARGUMENT".equals(
                                        code
                                )
                ) {

                    String fid =
                            fids.get(
                                    index
                            );


                    if (
                            fid != null
                                    &&
                                    !fid.isBlank()
                    ) {

                        invalidFids.add(
                                fid
                        );
                    }
                }
            }


            /*
             =================================================
             DELETE INVALID DEVICE RECORDS
             =================================================
             */

            for (
                    String fid
                    : invalidFids
            ) {

                try {

                    pushDeviceRepository
                            .deleteByFid(
                                    fid
                            );

                } catch (Exception deleteError) {

                    log.warn(
                            "Unable to delete invalid push installation {}",
                            fid,
                            deleteError
                    );
                }
            }


        } catch (Exception error) {

            log.warn(
                    "Unable to clean invalid push installations.",
                    error
            );
        }
    }


    /*
     =========================================================
     INITIALIZE FIREBASE
     =========================================================
     */

    private FirebaseApp getFirebaseApp()
            throws IOException {

        FirebaseApp initialized =
                firebaseApp;


        if (
                initialized != null
        ) {

            return initialized;
        }


        synchronized (this) {

            if (
                    firebaseApp != null
            ) {

                return firebaseApp;
            }


            /*
             =================================================
             USE AN EXISTING FIREBASE APP
             =================================================
             */

            FirebaseApp existing =
                    FirebaseApp
                            .getApps()
                            .stream()
                            .findFirst()
                            .orElse(
                                    null
                            );


            if (
                    existing != null
            ) {

                firebaseApp =
                        existing;

                return existing;
            }


            /*
             =================================================
             DEFAULT GOOGLE APPLICATION CREDENTIALS
             =================================================
             */

            FirebaseOptions options =
                    FirebaseOptions
                            .builder()
                            .setCredentials(
                                    GoogleCredentials
                                            .getApplicationDefault()
                            )
                            .build();


            firebaseApp =
                    FirebaseApp
                            .initializeApp(
                                    options
                            );


            return firebaseApp;
        }
    }


    /*
     =========================================================
     GET CURRENT USER
     =========================================================
     */

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        if (
                authentication == null
                        ||
                        !authentication.isAuthenticated()
        ) {

            throw new AccessDeniedException(
                    "User is not authenticated."
            );
        }


        return userRepository
                .findByUsername(
                        authentication.getName()
                )
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "Logged-in user not found."
                                )
                );
    }


    /*
     =========================================================
     RESOLVE NOTIFICATION URL
     =========================================================
     */

    private String resolveNotificationUrl(
            Notification notification
    ) {

        if (
                notification == null
        ) {

            return "/notifications";
        }


        String targetType =
                safe(
                        notification
                                .getTargetType(),
                        ""
                )
                        .toUpperCase(
                                Locale.ROOT
                        );


        Long targetId =
                notification.getTargetId();


        if (
                targetId == null
        ) {

            return "/notifications";
        }


        return switch (targetType) {

            case "TASK" ->
                    "/tasks/"
                            + targetId;


            case "WEB_DEVELOPMENT_PROJECT" ->
                    "/web/development/"
                            + targetId;


            case "DESIGN_PROJECT" ->
                    "/design/projects";


            case "DIGITAL_MARKETING_PROJECT" ->
                    "/digital/marketing";


            default ->
                    "/notifications";
        };
    }


    /*
     =========================================================
     SAFE STRING
     =========================================================
     */

    private String safe(
            String value,
            String fallback
    ) {

        if (
                value == null
                        ||
                        value.isBlank()
        ) {

            return fallback;
        }


        return value.trim();
    }
}
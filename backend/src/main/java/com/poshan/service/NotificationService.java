package com.poshan.service;


import com.poshan.dto.NotificationDTO;
import com.poshan.entity.Inventory;
import com.poshan.entity.Notification;
import com.poshan.entity.User;
import com.poshan.repository.NotificationRepository;
import com.poshan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;



@Service
@RequiredArgsConstructor
public class NotificationService {



    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;




    // Create Notification

    public NotificationDTO createNotification(
            NotificationDTO dto
    ){


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

                        .build();



        Notification saved =
                notificationRepository.save(notification);



        return mapToDTO(saved);


    }



    public void createLowStockNotification(
            Inventory inventory
    ) {

        List<User> admins =
                userRepository.findByRoles_Name("ROLE_ADMIN");

        for (User admin : admins) {

            Notification notification =
                    Notification.builder()

                            .title("Low Stock Alert")

                            .message(
                                    inventory.getBoxType()
                                            + " stock is low. "
                                            + "Available: "
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



    // Get all notifications of user

    public List<NotificationDTO> getUserNotifications(
            Long userId
    ){


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







    // Get unread count

    public long getUnreadCount(
            Long userId
    ){


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







    // Mark notification as read

    public NotificationDTO markAsRead(
            Long id
    ){


        Notification notification =
                notificationRepository.findById(id)

                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Notification not found"
                                )
                        );



        notification.setRead(true);



        Notification updated =
                notificationRepository.save(notification);



        return mapToDTO(updated);


    }







    // Delete notification

    public void deleteNotification(
            Long id
    ){


        if(!notificationRepository.existsById(id)){

            throw new RuntimeException(
                    "Notification not found"
            );

        }


        notificationRepository.deleteById(id);


    }








    private NotificationDTO mapToDTO(
            Notification notification
    ){


        NotificationDTO dto =
                new NotificationDTO();



        dto.setId(notification.getId());


        dto.setTitle(
                notification.getTitle()
        );


        dto.setMessage(
                notification.getMessage()
        );


        dto.setType(
                notification.getType()
        );


        dto.setRead(
                notification.isRead()
        );


        dto.setCreatedAt(
                notification.getCreatedAt()
        );



        if(notification.getUser()!=null){

            dto.setUserId(
                    notification.getUser().getId()
            );


            dto.setUsername(
                    notification.getUser().getUsername()
            );

        }



        return dto;


    }



}
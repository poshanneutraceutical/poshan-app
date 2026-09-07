package com.poshan.dto;


import lombok.Data;

import java.time.LocalDateTime;


@Data
public class NotificationDTO {


    private Long id;


    private String title;


    private String message;


    private String type;


    private boolean read;


    private LocalDateTime createdAt;


    private Long userId;


    private String username;


}
package com.poshan.repository;


import com.poshan.entity.Notification;
import com.poshan.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;



@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {



    // Get notifications for specific user
    List<Notification> findByUserOrderByCreatedAtDesc(User user);



    // Count unread notifications
    long countByUserAndIsReadFalse(User user);



    // Get unread notifications only
    List<Notification> findByUserAndIsReadFalseOrderByCreatedAtDesc(User user);



}
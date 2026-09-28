package com.poshan.aspect;

import com.poshan.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
@RequiredArgsConstructor
public class CreationNotificationAspect {

    private final NotificationService notificationService;

    @AfterReturning(
            pointcut = "@annotation(org.springframework.web.bind.annotation.PostMapping) && execution(* com.poshan.controller..*(..))",
            returning = "result"
    )
    public void notifyAfterSuccessfulCreate(
            JoinPoint joinPoint,
            Object result
    ) {

        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes == null) {
            return;
        }

        HttpServletRequest request = attributes.getRequest();

        String uri = request.getRequestURI();

        if (shouldSkip(uri)) {
            return;
        }

        notificationService
                .createGenericCreationNotifications(uri);
    }

    private boolean shouldSkip(String uri) {

        if (uri == null || !uri.startsWith("/api/")) {
            return true;
        }

        return uri.startsWith("/api/auth/")
                || uri.startsWith("/api/notifications")
                || uri.startsWith("/api/push/")
                || uri.startsWith("/api/uploads/")
                || uri.startsWith("/api/dashboard")
                || uri.startsWith("/api/hr/attendance")
                || uri.equals("/api/hr/manual-attendance/mark")
                || uri.startsWith("/api/tasks")
                || uri.startsWith("/api/web/")
                || uri.startsWith("/api/designing/")
                || uri.startsWith("/api/digital/")
                || uri.contains("/approve")
                || uri.contains("/reject")
                || uri.contains("/status")
                || uri.contains("/verify")
                || uri.contains("/check")
                || uri.contains("/mark")
                || uri.contains("/read")
                || uri.contains("/send");
    }
}

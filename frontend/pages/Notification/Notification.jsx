import { useCallback, useEffect, useState } from "react";
import {
    Bell,
    CheckCircle,
    Trash2,
    RefreshCcw,
    ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import notificationService from "../../services/notificationService";
import AuthService from "../../services/AuthService";

import "./Notification.css";


const getNotificationPath = (notification) => {

    const targetType =
        String(
            notification?.targetType || ""
        ).toUpperCase();

    const targetId =
        notification?.targetId;

    if (!targetId) {
        return "/notifications";
    }

    switch (targetType) {

        case "TASK":
            return `/tasks/${targetId}`;

        case "WEB_DEVELOPMENT_PROJECT":
            return `/web/development/${targetId}`;

        case "DESIGN_PROJECT":
            return "/design/projects";

        case "DIGITAL_MARKETING_PROJECT":
            return "/digital/marketing";

        default:
            return "/notifications";
    }
};


const getTypeLabel = (notification) => {

    const targetType =
        String(
            notification?.targetType || ""
        ).toUpperCase();

    switch (targetType) {

        case "TASK":
            return "Task";

        case "WEB_DEVELOPMENT_PROJECT":
            return "Web Development";

        case "DESIGN_PROJECT":
            return "Designing";

        case "DIGITAL_MARKETING_PROJECT":
            return "Digital Marketing";

        default:
            return notification?.type || "Notification";
    }
};


const Notification = () => {

    const navigate = useNavigate();

    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const user =
        AuthService.getUser();

    const userId =
        user?.id;


    const loadNotifications = useCallback(async () => {

        if (!userId) {
            setNotifications([]);
            setLoading(false);
            return;
        }

        try {

            setError("");
            setLoading(true);

            const data =
                await notificationService
                    .getUserNotifications(userId);

            setNotifications(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (requestError) {

            console.error(
                "Notification loading error:",
                requestError
            );

            setError(
                requestError.response?.data?.message ||
                requestError.response?.data ||
                "Unable to load notifications."
            );

        } finally {

            setLoading(false);
        }
    }, [userId]);


    useEffect(() => {

        const timer =
            setTimeout(() => {
                loadNotifications();
            }, 0);

        return () => {
            clearTimeout(timer);
        };

    }, [loadNotifications]);


    const markRead = async (id) => {

        try {

            await notificationService
                .markAsRead(id);

            setNotifications(
                current =>
                    current.map(
                        notification =>
                            notification.id === id
                                ? {
                                    ...notification,
                                    read: true
                                }
                                : notification
                    )
            );

            window.dispatchEvent(
                new Event("notifications-updated")
            );

        } catch (requestError) {

            console.error(
                "Notification read error:",
                requestError
            );
        }
    };


    const deleteNotification = async (id) => {

        try {

            await notificationService
                .deleteNotification(id);

            setNotifications(
                current =>
                    current.filter(
                        notification =>
                            notification.id !== id
                    )
            );

            window.dispatchEvent(
                new Event("notifications-updated")
            );

        } catch (requestError) {

            console.error(
                "Notification delete error:",
                requestError
            );
        }
    };


    const openNotification = async (notification) => {

        try {

            if (!notification.read) {
                await markRead(notification.id);
            }

        } finally {

            navigate(
                getNotificationPath(notification)
            );
        }
    };


    const unreadCount =
        notifications.filter(
            notification => !notification.read
        ).length;


    if (loading) {

        return (

            <div className="notification-loading">

                <RefreshCcw className="animate-spin" />

            </div>
        );
    }


    return (

        <div className="notification-container">

            <div className="notification-header">

                <div>

                    <div className="notification-title-row">

                        <Bell size={25} />

                        <h1>
                            Notifications
                        </h1>

                    </div>

                    <p>
                        {unreadCount > 0
                            ? `${unreadCount} unread notification${
                                unreadCount === 1
                                    ? ""
                                    : "s"
                            }`
                            : "You're all caught up."}
                    </p>

                </div>

                <button
                    type="button"
                    onClick={loadNotifications}
                    className="refresh-btn"
                    disabled={loading}
                >
                    <RefreshCcw size={18} />
                    Refresh
                </button>

            </div>

            {error && (
                <div className="notification-error">
                    {error}
                </div>
            )}

            <div className="notification-card">

                {notifications.length === 0 ? (

                    <div className="empty">

                        <Bell size={40} />

                        <p>
                            No notifications available
                        </p>

                    </div>

                ) : (

                    notifications.map(
                        notification => (

                            <div
                                key={notification.id}
                                className={
                                    notification.read
                                        ? "notification-item read"
                                        : "notification-item"
                                }
                            >

                                <div className="notification-icon">

                                    <Bell size={22} />

                                </div>

                                <button
                                    type="button"
                                    className="notification-content-button"
                                    onClick={() =>
                                        openNotification(
                                            notification
                                        )
                                    }
                                >

                                    <div className="notification-content">

                                        <div className="notification-title-line">

                                            <h3>
                                                {notification.title}
                                            </h3>

                                            {!notification.read && (
                                                <span className="notification-unread-dot" />
                                            )}

                                        </div>

                                        <p>
                                            {notification.message}
                                        </p>

                                        <span>
                                            {getTypeLabel(notification)}
                                            {" • "}
                                            {
                                                notification.createdAt
                                                    ? new Date(
                                                        notification.createdAt
                                                    ).toLocaleString("en-IN")
                                                    : ""
                                            }
                                        </span>

                                    </div>

                                </button>

                                <div className="notification-actions">

                                    {!notification.read && (

                                        <button
                                            type="button"
                                            title="Mark as read"
                                            onClick={() =>
                                                markRead(
                                                    notification.id
                                                )
                                            }
                                        >
                                            <CheckCircle size={20} />
                                        </button>

                                    )}

                                    {notification.targetId && (

                                        <button
                                            type="button"
                                            title="Open notification"
                                            onClick={() =>
                                                openNotification(
                                                    notification
                                                )
                                            }
                                        >
                                            <ExternalLink size={20} />
                                        </button>

                                    )}

                                    <button
                                        type="button"
                                        title="Delete notification"
                                        onClick={() =>
                                            deleteNotification(
                                                notification.id
                                            )
                                        }
                                    >
                                        <Trash2 size={20} />
                                    </button>

                                </div>

                            </div>
                        )
                    )
                )}

            </div>

        </div>
    );
};

export default Notification;

import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import {
    Bell,
    ExternalLink,
    X
} from "lucide-react";

import {
    useNavigate
} from "react-router-dom";

import notificationService
    from "../services/notificationService";

import AuthService
    from "../services/AuthService";

import initializePushNotifications
    from "../services/pushNotificationService";


/*
============================================================
NOTIFICATION POLLING
============================================================

The popup is designed to appear while the user is anywhere
inside the ERP. NotificationBell is already mounted inside
Navbar -> DashboardLayout, so no separate page is required.

The server is checked every 3 seconds so a newly-created
notification appears quickly without requiring a page refresh.
============================================================
*/

const POLL_INTERVAL = 3000;

const POPUP_DURATION = 9000;


/*
============================================================
STORAGE KEY
============================================================

We remember the newest notification ID already processed for
this browser/user. This prevents old notifications from showing
as popups every time the ERP is opened.
============================================================
*/

const getStorageKey = (userId) =>
    `poshan-last-notification-id-${userId}`;


/*
============================================================
READ STATUS HELPER
============================================================

Depending on the backend/Jackson response, the boolean may be
returned as `read` or `isRead`. Support both so the popup and
unread count remain reliable.
============================================================
*/

const isNotificationRead = (notification) => {

    if (!notification) {
        return false;
    }

    if (typeof notification.isRead === "boolean") {
        return notification.isRead;
    }

    if (typeof notification.read === "boolean") {
        return notification.read;
    }

    return false;
};


/*
============================================================
NOTIFICATION TARGET ROUTE
============================================================
*/

const getNotificationPath = (notification) => {

    const targetType = String(
        notification?.targetType || ""
    ).toUpperCase();

    const targetId = notification?.targetId;

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


/*
============================================================
TIME FORMAT
============================================================
*/

const getNotificationTime = (value) => {

    if (!value) {
        return "Just now";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Just now";
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    });
};


/*
============================================================
NOTIFICATION BELL COMPONENT
============================================================
*/

const NotificationBell = () => {

    const navigate = useNavigate();

    const user = AuthService.getUser();

    const userId = user?.id;


    /*
    --------------------------------------------------------
    STATE
    --------------------------------------------------------
    */

    const [count, setCount] = useState(0);

    const [popup, setPopup] = useState(null);


    /*
    --------------------------------------------------------
    REFS
    --------------------------------------------------------
    */

    const initializedRef = useRef(false);

    const popupTimerRef = useRef(null);

    const loadingRef = useRef(false);

    /*
     * Prevent repeated push initialization attempts while the
     * current browser session is already being registered.
     */
    const pushInitializedRef = useRef(false);


    /*
============================================================
SHOW POPUP
============================================================
*/

    const showPopup = useCallback((notification) => {

        if (!notification?.id) {
            return;
        }

        setPopup(notification);

        if (popupTimerRef.current) {
            clearTimeout(popupTimerRef.current);
        }

        popupTimerRef.current = setTimeout(() => {

            setPopup(null);

        }, POPUP_DURATION);

    }, []);


    /*
============================================================
INITIALIZE PUSH NOTIFICATIONS
============================================================

This first call is silent.

It does NOT ask the browser for permission.

Its purpose is to prepare Firebase push when the user is already
allowed to receive notifications.

Permission is explicitly requested from the Notification Bell
click below.
============================================================
*/

    useEffect(() => {

        if (!userId) {
            return;
        }

        let cancelled = false;

        const setupPush = async () => {

            try {

                const result =
                    await initializePushNotifications({
                        requestPermission: false,
                        userId
                    });

                if (!cancelled && result) {
                    pushInitializedRef.current = true;
                }

            } catch (error) {

                console.error(
                    "Silent push initialization failed:",
                    error
                );

            }
        };

        setupPush();

        return () => {

            cancelled = true;

        };

    }, [userId]);


    /*
============================================================
LOAD NOTIFICATIONS
============================================================
*/

    const loadNotifications = useCallback(async () => {

        if (!userId || loadingRef.current) {
            return;
        }

        loadingRef.current = true;

        try {

            const response =
                await notificationService
                    .getUserNotifications(userId);

            const notifications =
                Array.isArray(response)
                    ? response
                    : [];


            /*
            --------------------------------------------------
            Keep newest notifications first even if the backend
            response order changes.
            --------------------------------------------------
            */

            const sortedNotifications = [
                ...notifications
            ].sort(
                (first, second) =>
                    Number(second?.id || 0) -
                    Number(first?.id || 0)
            );


            /*
            --------------------------------------------------
            UNREAD COUNT
            --------------------------------------------------
            */

            const unreadCount =
                sortedNotifications.filter(
                    notification =>
                        !isNotificationRead(notification)
                ).length;

            setCount(unreadCount);


            if (sortedNotifications.length === 0) {
                return;
            }


            const storageKey =
                getStorageKey(userId);

            const storedLastId = Number(
                localStorage.getItem(storageKey) || 0
            );

            const newestNotification =
                sortedNotifications[0];

            const newestId = Number(
                newestNotification?.id || 0
            );


            /*
            --------------------------------------------------
            FIRST LOAD

            Establish the current DB state as the baseline.
            This prevents old notifications from popping as soon
            as somebody logs in.
            --------------------------------------------------
            */

            if (!initializedRef.current) {

                initializedRef.current = true;

                if (!storedLastId) {

                    localStorage.setItem(
                        storageKey,
                        String(newestId)
                    );

                    return;
                }
            }


            const lastProcessedId = Number(
                localStorage.getItem(storageKey) || 0
            );


            /*
            --------------------------------------------------
            FIND NEW NOTIFICATIONS
            --------------------------------------------------
            */

            const newUnreadNotifications =
                sortedNotifications.filter(
                    notification =>
                        Number(notification?.id || 0) >
                            lastProcessedId
                        &&
                        !isNotificationRead(notification)
                );


            if (newUnreadNotifications.length > 0) {

                /*
                 * The list is newest-first, so the first item is
                 * the latest notification to show.
                 */

                showPopup(
                    newUnreadNotifications[0]
                );

            }


            /*
            --------------------------------------------------
            SAVE NEWEST PROCESSED ID
            --------------------------------------------------
            */

            if (newestId > lastProcessedId) {

                localStorage.setItem(
                    storageKey,
                    String(newestId)
                );
            }

        } catch (error) {

            console.error(
                "Notification loading error:",
                error
            );

        } finally {

            loadingRef.current = false;
        }

    }, [
        userId,
        showPopup
    ]);


    /*
============================================================
POLLING / EVENT LISTENER
============================================================
*/

    useEffect(() => {

        initializedRef.current = false;

        loadingRef.current = false;

        if (popupTimerRef.current) {
            clearTimeout(popupTimerRef.current);
        }

        setPopup(null);
        setCount(0);


        if (!userId) {
            return undefined;
        }


        /*
         * Load once immediately.
         */

        loadNotifications();


        /*
         * Then keep checking for newly-created notifications.
         */

        const interval = setInterval(
            () => {

                loadNotifications();

            },
            POLL_INTERVAL
        );


        /*
         * Other components can trigger an immediate refresh after
         * a notification is marked read or changed.
         */

        const handleNotificationsUpdated = () => {

            loadNotifications();

        };

        window.addEventListener(
            "notifications-updated",
            handleNotificationsUpdated
        );


        return () => {

            clearInterval(interval);

            window.removeEventListener(
                "notifications-updated",
                handleNotificationsUpdated
            );

            if (popupTimerRef.current) {
                clearTimeout(popupTimerRef.current);
            }
        };

    }, [
        userId,
        loadNotifications
    ]);


    /*
============================================================
OPEN POPUP NOTIFICATION
============================================================
*/

    const openNotification = async (
        notification
    ) => {

        if (!notification?.id) {

            setPopup(null);

            navigate("/notifications");

            return;
        }

        try {

            if (!isNotificationRead(notification)) {

                await notificationService
                    .markAsRead(notification.id);
            }

        } catch (error) {

            console.error(
                "Notification read error:",
                error
            );

        } finally {

            setPopup(null);

            window.dispatchEvent(
                new Event("notifications-updated")
            );

            navigate(
                getNotificationPath(
                    notification
                )
            );
        }
    };


    /*
============================================================
DISMISS POPUP
============================================================
*/

    const dismissPopup = () => {

        setPopup(null);

        if (popupTimerRef.current) {

            clearTimeout(
                popupTimerRef.current
            );
        }
    };


    /*
============================================================
OPEN NOTIFICATION BELL
============================================================

This click is the important user gesture.

When browser permission is still "default", this calls
Notification.requestPermission() through the Firebase service.

After permission is granted, the browser registers the Firebase
installation and the frontend sends its FID to:

POST /api/push/register

============================================================
*/

    const handleNotificationBellClick = async () => {

        try {

            const result =
                await initializePushNotifications({
                    requestPermission: true,
                    userId
                });

            if (result) {

                pushInitializedRef.current = true;

                console.log(
                    "POSHAN browser push notifications are enabled."
                );

            } else {

                console.warn(
                    "POSHAN browser push notifications were not enabled."
                );
            }

        } catch (error) {

            console.error(
                "Notification permission / push setup error:",
                error
            );

        } finally {

            navigate("/notifications");

        }
    };


    /*
============================================================
RENDER
============================================================
*/

    return (

        <>

            {/* =================================================
                NOTIFICATION BELL
            ================================================= */}

            <button
                type="button"
                onClick={handleNotificationBellClick}
                className="relative flex items-center"
                aria-label="Open notifications"
                title="Notifications"
                style={{
                    color: "#dc2626"
                }}
            >

                <Bell
                    size={26}
                    style={{
                        color: "#dc2626"
                    }}
                />

                {count > 0 && (

                    <span
                        className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white"
                        style={{
                            color: "#ffffff"
                        }}
                    >

                        {count > 99
                            ? "99+"
                            : count}

                    </span>

                )}

            </button>


            {/* =================================================
                GLOBAL NEW-NOTIFICATION POPUP

                This popup is intentionally rendered here rather
                than inside the Notifications page, so it appears
                while the user is on Dashboard, Tasks, Design,
                Web Development, Digital Marketing, etc.
            ================================================= */}

            {popup && (

                <div
                    role="alert"
                    aria-live="assertive"
                    style={{
                        position: "fixed",
                        top: "76px",
                        right: "24px",
                        zIndex: 2147483647,
                        width:
                            "min(420px, calc(100vw - 28px))",
                        background: "#ffffff",
                        border:
                            "1px solid #d8e1ec",
                        borderRadius: "18px",
                        boxShadow:
                            "0 24px 70px rgba(15, 23, 42, 0.24)",
                        overflow: "hidden",
                        animation:
                            "poshanNotificationSlideIn 0.28s ease-out"
                    }}
                >

                    {/* =================================================
                        TOP ACCENT
                    ================================================= */}

                    <div
                        style={{
                            height: "4px",
                            background: "#0b3d2e"
                        }}
                    />


                    <div
                        style={{
                            padding:
                                "16px 16px 15px"
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems:
                                    "flex-start",
                                gap: "12px"
                            }}
                        >

                            {/* =================================================
                                ICON
                            ================================================= */}

                            <div
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    minWidth: "44px",
                                    borderRadius: "13px",
                                    background:
                                        "#eaf8f4",
                                    color:
                                        "#0b5d48",
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center"
                                }}
                            >

                                <Bell size={22} />

                            </div>


                            {/* =================================================
                                CONTENT
                            ================================================= */}

                            <div
                                style={{
                                    flex: 1,
                                    minWidth: 0
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems:
                                            "flex-start",
                                        justifyContent:
                                            "space-between",
                                        gap: "10px"
                                    }}
                                >

                                    <div>

                                        <div
                                            style={{
                                                color:
                                                    "#94a3b8",
                                                fontSize:
                                                    "10px",
                                                fontWeight:
                                                    700,
                                                textTransform:
                                                    "uppercase",
                                                letterSpacing:
                                                    "0.08em",
                                                marginBottom:
                                                    "3px"
                                            }}
                                        >
                                            New notification
                                        </div>


                                        <strong
                                            style={{
                                                display:
                                                    "block",
                                                color:
                                                    "#162033",
                                                fontSize:
                                                    "15px",
                                                lineHeight:
                                                    1.35
                                            }}
                                        >
                                            {popup.title ||
                                                "New notification"}
                                        </strong>

                                    </div>


                                    {/* =================================================
                                        CLOSE
                                    ================================================= */}

                                    <button
                                        type="button"
                                        onClick={
                                            dismissPopup
                                        }
                                        aria-label="Dismiss notification"
                                        title="Dismiss"
                                        style={{
                                            border: 0,
                                            background:
                                                "transparent",
                                            color:
                                                "#94a3b8",
                                            cursor:
                                                "pointer",
                                            padding: "1px",
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center"
                                        }}
                                    >

                                        <X size={18} />

                                    </button>

                                </div>


                                {/* =================================================
                                    MESSAGE
                                ================================================= */}

                                <p
                                    style={{
                                        margin:
                                            "8px 0 4px",
                                        color:
                                            "#526176",
                                        fontSize:
                                            "13px",
                                        lineHeight:
                                            1.55,
                                        wordBreak:
                                            "break-word"
                                    }}
                                >
                                    {popup.message ||
                                        "You have a new notification."}
                                </p>


                                {/* =================================================
                                    TIME
                                ================================================= */}

                                <div
                                    style={{
                                        color:
                                            "#94a3b8",
                                        fontSize:
                                            "11px"
                                    }}
                                >
                                    {getNotificationTime(
                                        popup.createdAt
                                    )}
                                </div>


                                {/* =================================================
                                    ACTIONS
                                ================================================= */}

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: "9px",
                                        marginTop:
                                            "12px"
                                    }}
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openNotification(
                                                popup
                                            )
                                        }
                                        style={{
                                            display:
                                                "inline-flex",
                                            alignItems:
                                                "center",
                                            gap: "6px",
                                            border: 0,
                                            borderRadius:
                                                "10px",
                                            background:
                                                "#0b3d2e",
                                            color:
                                                "#ffffff",
                                            padding:
                                                "8px 13px",
                                            fontSize:
                                                "12px",
                                            fontWeight:
                                                700,
                                            cursor:
                                                "pointer"
                                        }}
                                    >

                                        Open

                                        <ExternalLink
                                            size={14}
                                        />

                                    </button>


                                    <button
                                        type="button"
                                        onClick={
                                            dismissPopup
                                        }
                                        style={{
                                            border: 0,
                                            background:
                                                "transparent",
                                            color:
                                                "#64748b",
                                            padding:
                                                "8px 4px",
                                            fontSize:
                                                "12px",
                                            fontWeight:
                                                600,
                                            cursor:
                                                "pointer"
                                        }}
                                    >
                                        Dismiss
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                POPUP ANIMATION
            ================================================= */}

            <style>
                {`
                    @keyframes poshanNotificationSlideIn {

                        from {
                            opacity: 0;
                            transform:
                                translateY(-14px)
                                translateX(18px);
                        }

                        to {
                            opacity: 1;
                            transform:
                                translateY(0)
                                translateX(0);
                        }
                    }

                    @media (max-width: 640px) {

                        .poshan-notification-popup {
                            right: 12px;
                            left: 12px;
                            width: auto;
                        }
                    }
                `}
            </style>

        </>

    );
};


export default NotificationBell;
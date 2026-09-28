import {
    getApps,
    initializeApp
} from "firebase/app";

import {
    getMessaging,
    isSupported,
    onMessage,
    onRegistered,
    onUnregistered,
    register
} from "firebase/messaging";

const PUSH_SCOPE =
    "/firebase-cloud-messaging-push-scope/";

const SW_URL =
    "/firebase-messaging-sw.js";

let setupPromise = null;
let messagingInstance = null;
let serviceWorkerRegistration = null;
let listenersInitialized = false;
let currentUserId = null;

const getToken = () => {

    const keys = [
        "token",
        "accessToken",
        "jwt",
        "authToken"
    ];

    for (const key of keys) {
        const value = localStorage.getItem(key);

        if (value) {
            return value;
        }
    }

    return "";
};

const apiRequest = async (url, options = {}) => {

    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`;
    }

    const response =
        await fetch(
            url,
            {
                ...options,
                headers
            }
        );

    if (!response.ok) {
        const body =
            await response.text().catch(() => "");

        throw new Error(
            body
                ||
            `Push API request failed: ${response.status}`
        );
    }

    return response;
};

const getWebConfig = async () => {

    const response =
        await fetch(
            "/api/push/config",
            {
                cache: "no-store"
            }
        );

    if (!response.ok) {
        throw new Error(
            "Unable to load push notification configuration."
        );
    }

    return response.json();
};

const registerServiceWorker = async () => {

    if (!("serviceWorker" in navigator)) {
        throw new Error(
            "Service workers are not supported."
        );
    }

    return navigator.serviceWorker.register(
        SW_URL,
        {
            scope: PUSH_SCOPE
        }
    );
};

const ensureListeners = () => {

    if (listenersInitialized || !messagingInstance) {
        return;
    }

    onRegistered(
        messagingInstance,
        async (installationId) => {

            if (!installationId || !currentUserId) {
                return;
            }

            try {

                await apiRequest(
                    "/api/push/register",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            fid: installationId
                        })
                    }
                );

            } catch (error) {

                console.error(
                    "Push installation registration failed:",
                    error
                );
            }
        }
    );

    onUnregistered(
        messagingInstance,
        async (installationId) => {

            if (!installationId) {
                return;
            }

            try {

                await apiRequest(
                    "/api/push/register",
                    {
                        method: "DELETE",
                        body: JSON.stringify({
                            fid: installationId
                        })
                    }
                );

            } catch (error) {

                console.error(
                    "Push installation removal failed:",
                    error
                );
            }
        }
    );

    onMessage(
        messagingInstance,
        (payload) => {

            const title =
                payload?.data?.title
                    ||
                payload?.notification?.title
                    ||
                "POSHAN ERP";

            const body =
                payload?.data?.body
                    ||
                payload?.notification?.body
                    ||
                "You have a new notification.";

            try {

                if (
                    typeof Notification !== "undefined"
                        &&
                    Notification.permission === "granted"
                ) {

                    new Notification(
                        title,
                        {
                            body,
                            icon: "/pwa-192.png",
                            tag: `poshan-${payload?.data?.type || "notification"}`
                        }
                    );
                }

            } catch (error) {

                console.error(
                    "Foreground push notification failed:",
                    error
                );
            }
        }
    );

    listenersInitialized = true;
};

const setup = async ({
    requestPermission = false,
    userId = null
} = {}) => {

    if (!userId) {
        return false;
    }

    if (typeof window === "undefined") {
        return false;
    }

    if (!("Notification" in window)) {
        return false;
    }

    currentUserId = userId;

    const supported =
        await isSupported().catch(() => false);

    if (!supported) {
        return false;
    }

    if (Notification.permission === "denied") {
        return false;
    }

    if (
        requestPermission
            &&
        Notification.permission !== "granted"
    ) {

        const permission =
            await Notification.requestPermission();

        if (permission !== "granted") {
            return false;
        }
    }

    if (Notification.permission !== "granted") {
        return false;
    }

    const config =
        await getWebConfig();

    if (
        !config?.apiKey
            || !config?.projectId
            || !config?.messagingSenderId
            || !config?.appId
            || !config?.vapidKey
    ) {
        throw new Error(
            "Firebase web push configuration is incomplete."
        );
    }

    const firebaseConfig = {
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId
    };

    const app =
        getApps().length > 0
            ? getApps()[0]
            : initializeApp(firebaseConfig);

    messagingInstance =
        getMessaging(app);

    serviceWorkerRegistration =
        await registerServiceWorker();

    ensureListeners();

    await register(
        messagingInstance,
        {
            vapidKey: config.vapidKey,
            serviceWorkerRegistration
        }
    );

    return true;
};

const initializePushNotifications = async ({
    requestPermission = false,
    userId = null
} = {}) => {

    if (!userId) {
        currentUserId = null;
        return false;
    }

    currentUserId = userId;

    /*
     * The silent startup call is intentionally not cached when the
     * browser is still at permission=default. This allows the user to
     * tap the bell later and receive the permission prompt in the click
     * gesture, which is important for iOS Home Screen web apps.
     */
    if (
        setupPromise
            &&
        Notification.permission === "granted"
    ) {
        return setupPromise;
    }

    setupPromise =
        setup({
            requestPermission,
            userId
        }).catch(error => {

            console.error(
                "POSHAN push notification setup failed:",
                error
            );

            return false;
        });

    return setupPromise;
};

export default initializePushNotifications;

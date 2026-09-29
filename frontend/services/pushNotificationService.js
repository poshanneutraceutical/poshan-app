import {
    getApps,
    initializeApp
} from "firebase/app";

import {
    getMessaging,
    getToken,
    isSupported,
    onMessage
} from "firebase/messaging";


const PUSH_SCOPE =
    "/firebase-cloud-messaging-push-scope/";

const SW_URL =
    "/firebase-messaging-sw.js";


// IMPORTANT:
// This now stores the actual FCM registration token,
// NOT the Firebase Installation ID (FID).
const FCM_TOKEN_STORAGE_KEY =
    "poshan-fcm-token";


let messagingInstance = null;
let serviceWorkerRegistration = null;
let listenersInitialized = false;
let currentUserId = null;

let setupPromise = null;
let setupUserId = null;


/*
============================================================
JWT FOR PUSH API
============================================================
*/

const getTokenFromStorage = () => {

    const keys = [
        "token",
        "accessToken",
        "jwt",
        "authToken"
    ];

    for (const key of keys) {

        const value =
            localStorage.getItem(key);

        if (value) {
            return value;
        }
    }

    return "";
};


/*
============================================================
API REQUEST
============================================================
*/

const apiRequest = async (
    url,
    options = {}
) => {

    const token =
        getTokenFromStorage();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {

        headers.Authorization =
            token.startsWith("Bearer ")
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
            await response.text()
                .catch(() => "");

        throw new Error(
            body ||
            `Push API request failed: ${response.status}`
        );
    }

    return response;
};


/*
============================================================
PUBLIC FIREBASE CONFIG
============================================================
*/

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


/*
============================================================
SERVICE WORKER
============================================================
*/

const registerServiceWorker = async () => {

    if (
        !("serviceWorker" in navigator)
    ) {

        throw new Error(
            "Service workers are not supported."
        );
    }


    const registration =
        await navigator.serviceWorker.register(
            SW_URL,
            {
                scope: PUSH_SCOPE,
                updateViaCache: "none"
            }
        );


    try {

        await registration.update();

    } catch (error) {

        console.warn(
            "POSHAN push service-worker update check failed:",
            error
        );
    }


    return registration;
};


/*
============================================================
REGISTER ACTUAL FCM TOKEN WITH BACKEND
============================================================

IMPORTANT:

Firebase has two different things:

1. FID
   Firebase Installation ID

2. FCM registration token
   The actual destination Firebase Cloud Messaging uses
   to deliver a push notification.

The backend MUST store/use the FCM registration token.
============================================================
*/

const registerFcmTokenForCurrentUser = async (
    fcmToken
) => {

    if (!fcmToken) {
        return;
    }


    localStorage.setItem(
        FCM_TOKEN_STORAGE_KEY,
        fcmToken
    );


    if (!currentUserId) {
        return;
    }


    try {

        await apiRequest(
            "/api/push/register",
            {
                method: "POST",

                body: JSON.stringify({
                    /*
                     * We intentionally keep the existing
                     * backend property name "fid" so that
                     * we don't need to change the API contract.
                     *
                     * The VALUE is now the real FCM token.
                     */
                    fid: fcmToken
                })
            }
        );


        console.log(
            "POSHAN FCM device registered successfully."
        );

    } catch (error) {

        console.error(
            "POSHAN FCM token registration failed:",
            error
        );
    }
};


/*
============================================================
FOREGROUND FCM MESSAGE
============================================================
*/

const ensureListeners = () => {

    if (
        listenersInitialized ||
        !messagingInstance
    ) {

        return;
    }


    onMessage(
        messagingInstance,
        (payload) => {

            const title =
                payload?.data?.title ||
                payload?.notification?.title ||
                "POSHAN ERP";

            const body =
                payload?.data?.body ||
                payload?.notification?.body ||
                "You have a new notification.";


            try {

                if (
                    typeof Notification !== "undefined" &&
                    Notification.permission === "granted"
                ) {

                    new Notification(
                        title,
                        {
                            body,

                            icon:
                                "/pwa-192.png",

                            badge:
                                "/pwa-192.png",

                            tag:
                                `poshan-${
                                    payload?.data?.targetType ||
                                    payload?.data?.type ||
                                    "notification"
                                }-${
                                    payload?.data?.targetId ||
                                    Date.now()
                                }`
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


/*
============================================================
SETUP PUSH
============================================================
*/

const setup = async ({
    requestPermission = false,
    userId = null
} = {}) => {

    if (!userId) {
        return false;
    }


    if (
        typeof window === "undefined"
    ) {

        return false;
    }


    if (
        !("Notification" in window)
    ) {

        return false;
    }


    currentUserId =
        userId;


    /*
     * Check browser support.
     */

    const supported =
        await isSupported()
            .catch(() => false);


    if (!supported) {

        console.warn(
            "POSHAN push notifications are not supported in this browser."
        );

        return false;
    }


    /*
     * Permission already denied.
     */

    if (
        Notification.permission === "denied"
    ) {

        console.warn(
            "POSHAN notification permission is denied."
        );

        return false;
    }


    /*
     * Ask permission only when requested.
     */

    if (
        requestPermission &&
        Notification.permission !== "granted"
    ) {

        const permission =
            await Notification.requestPermission();


        if (
            permission !== "granted"
        ) {

            return false;
        }
    }


    /*
     * Push requires notification permission.
     */

    if (
        Notification.permission !== "granted"
    ) {

        return false;
    }


    /*
     * Get Firebase configuration.
     */

    const config =
        await getWebConfig();


    if (
        !config?.apiKey ||
        !config?.projectId ||
        !config?.messagingSenderId ||
        !config?.appId ||
        !config?.vapidKey
    ) {

        throw new Error(
            "Firebase web push configuration is incomplete."
        );
    }


    const firebaseConfig = {

        apiKey:
            config.apiKey,

        authDomain:
            config.authDomain,

        projectId:
            config.projectId,

        storageBucket:
            config.storageBucket,

        messagingSenderId:
            config.messagingSenderId,

        appId:
            config.appId
    };


    /*
     * Initialize Firebase only once.
     */

    const app =
        getApps().length > 0
            ? getApps()[0]
            : initializeApp(
                firebaseConfig
            );


    messagingInstance =
        getMessaging(app);


    /*
     * Register service worker.
     */

    if (!serviceWorkerRegistration) {

        serviceWorkerRegistration =
            await registerServiceWorker();
    }


    /*
     * Foreground listener.
     */

    ensureListeners();


    /*
     ========================================================
     IMPORTANT FIX
     ========================================================

     DO NOT use Firebase "register()" here.

     That gives us the Firebase Installation ID (FID).

     We need getToken() because the backend needs the
     actual FCM registration token.
     ========================================================
    */

    const fcmToken =
        await getToken(
            messagingInstance,
            {
                vapidKey:
                    config.vapidKey,

                serviceWorkerRegistration
            }
        );


    if (!fcmToken) {

        throw new Error(
            "Firebase did not return an FCM registration token."
        );
    }


    console.log(
        "POSHAN FCM token obtained successfully."
    );


    /*
     * Save + register actual FCM token.
     */

    await registerFcmTokenForCurrentUser(
        fcmToken
    );


    return true;
};


/*
============================================================
PUBLIC INITIALIZER
============================================================
*/

const initializePushNotifications = async ({
    requestPermission = false,
    userId = null
} = {}) => {

    if (!userId) {

        currentUserId =
            null;

        return false;
    }


    currentUserId =
        userId;


    const normalizedUserId =
        String(userId);


    /*
     * Reuse setup for the same user.
     */

    if (
        setupPromise &&
        setupUserId === normalizedUserId &&
        typeof Notification !== "undefined" &&
        Notification.permission === "granted"
    ) {

        return setupPromise;
    }


    setupUserId =
        normalizedUserId;


    setupPromise =
        setup({
            requestPermission,
            userId
        })
        .catch(error => {

            console.error(
                "POSHAN push notification setup failed:",
                error
            );

            return false;
        });


    return setupPromise;
};


/*
============================================================
REMOVE DEVICE ON EXPLICIT LOGOUT
============================================================

Closing the app DOES NOT call this.

The device remains registered with the backend.

This is important because we want:

Aakash closes POSHAN
        ↓
Admin assigns task
        ↓
Aakash still receives push notification
============================================================
*/

export const unregisterCurrentPushDevice =
    async () => {

        const fcmToken =
            localStorage.getItem(
                FCM_TOKEN_STORAGE_KEY
            );


        if (!fcmToken) {

            currentUserId =
                null;

            setupPromise =
                null;

            setupUserId =
                null;

            return;
        }


        try {

            if (
                getTokenFromStorage() &&
                currentUserId
            ) {

                await apiRequest(
                    "/api/push/register",
                    {
                        method: "DELETE",

                        body: JSON.stringify({
                            fid: fcmToken
                        })
                    }
                );
            }

        } catch (error) {

            console.error(
                "Unable to remove the current push device during logout:",
                error
            );

        } finally {

            localStorage.removeItem(
                FCM_TOKEN_STORAGE_KEY
            );

            currentUserId =
                null;

            setupPromise =
                null;

            setupUserId =
                null;
        }
    };


export default initializePushNotifications;
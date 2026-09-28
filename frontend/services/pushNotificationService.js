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

const FID_STORAGE_KEY =
    "poshan-push-fid";


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

const getToken = () => {

    const keys = [
        "token",
        "accessToken",
        "jwt",
        "authToken"
    ];

    for (const key of keys) {

        const value =
            localStorage.getItem(
                key
            );

        if (value) {
            return value;
        }
    }

    return "";
};


const apiRequest = async (
    url,
    options = {}
) => {

    const token = getToken();

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


    /*
     * updateViaCache="none" helps the browser check the FCM
     * service-worker script for updates instead of keeping an old
     * cached copy indefinitely.
     */

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
SEND FID TO BACKEND
============================================================
*/

const registerFidForCurrentUser = async (
    installationId
) => {

    if (!installationId) {
        return;
    }


    localStorage.setItem(
        FID_STORAGE_KEY,
        installationId
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
};


/*
============================================================
FCM EVENT LISTENERS
============================================================
*/

const ensureListeners = () => {

    if (
        listenersInitialized ||
        !messagingInstance
    ) {
        return;
    }


    onRegistered(
        messagingInstance,
        registerFidForCurrentUser
    );


    onUnregistered(
        messagingInstance,
        async (installationId) => {

            if (
                installationId &&
                localStorage.getItem(
                    FID_STORAGE_KEY
                ) === installationId
            ) {

                localStorage.removeItem(
                    FID_STORAGE_KEY
                );
            }


            if (!installationId) {
                return;
            }


            /*
             * When Firebase reports that an installation is no
             * longer active, remove it from our server as well.
             */

            if (!currentUserId) {
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
                            icon: "/pwa-192.png",
                            badge: "/pwa-192.png",
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


    currentUserId = userId;


    const supported =
        await isSupported()
            .catch(() => false);


    if (!supported) {
        return false;
    }


    if (
        Notification.permission === "denied"
    ) {
        return false;
    }


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


    if (
        Notification.permission !== "granted"
    ) {
        return false;
    }


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
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId:
            config.messagingSenderId,
        appId: config.appId
    };


    const app =
        getApps().length > 0
            ? getApps()[0]
            : initializeApp(
                firebaseConfig
            );


    messagingInstance =
        getMessaging(app);


    if (!serviceWorkerRegistration) {

        serviceWorkerRegistration =
            await registerServiceWorker();
    }


    ensureListeners();


    /*
     * Firebase's FID API stores the installation registration in the
     * browser. Calling register() again after a login/app startup is
     * safe and causes onRegistered() to provide the current FID.
     * This is what reconnects the browser installation to the current
     * ERP user after an app reopen or user change.
     */

    await register(
        messagingInstance,
        {
            vapidKey: config.vapidKey,
            serviceWorkerRegistration
        }
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

        currentUserId = null;
        return false;
    }


    currentUserId = userId;


    const normalizedUserId =
        String(userId);


    /*
     * Do not reuse a setup promise that belongs to another ERP user.
     * This matters when the same browser logs out and another user
     * logs in later.
     */

    if (
        setupPromise &&
        setupUserId === normalizedUserId &&
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
        }).catch(error => {

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

Closing the app/PWA never calls this function.

It only removes the server association when the user explicitly
logs out. The Firebase browser registration itself is kept so the
next login can register the same/new FID again.
============================================================
*/

export const unregisterCurrentPushDevice = async () => {

    const fid =
        localStorage.getItem(
            FID_STORAGE_KEY
        );


    if (!fid) {

        currentUserId = null;
        return;
    }


    try {

        if (
            getToken() &&
            currentUserId
        ) {

            await apiRequest(
                "/api/push/register",
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        fid
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
            FID_STORAGE_KEY
        );

        currentUserId = null;
        setupPromise = null;
        setupUserId = null;
    }
};
export default initializePushNotifications;

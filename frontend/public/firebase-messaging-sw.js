/*
 * POSHAN ERP Firebase Cloud Messaging service worker.
 *
 * This worker has a dedicated narrow scope so the existing root PWA
 * service worker remains untouched.
 */

importScripts(
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);

let messagingReady = null;

const loadConfig = async () => {

    const response =
        await fetch(
            "/api/push/config",
            {
                cache: "no-store"
            }
        );

    if (!response.ok) {
        throw new Error(
            "Unable to load POSHAN push configuration."
        );
    }

    return response.json();
};

const getMessaging = async () => {

    if (messagingReady) {
        return messagingReady;
    }

    messagingReady =
        loadConfig()
            .then(config => {

                if (
                    !config?.apiKey
                        || !config?.projectId
                        || !config?.messagingSenderId
                        || !config?.appId
                ) {
                    throw new Error(
                        "Incomplete Firebase web configuration."
                    );
                }

                if (!firebase.apps.length) {

                    firebase.initializeApp({
                        apiKey: config.apiKey,
                        authDomain: config.authDomain,
                        projectId: config.projectId,
                        storageBucket: config.storageBucket,
                        messagingSenderId: config.messagingSenderId,
                        appId: config.appId
                    });
                }

                return firebase.messaging();
            });

    return messagingReady;
};

getMessaging()
    .then(messaging => {

        messaging.onBackgroundMessage(
            payload => {

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

                const url =
                    payload?.data?.url
                        ||
                    "/notifications";

                return self.registration.showNotification(
                    title,
                    {
                        body,
                        icon: "/pwa-192.png",
                        badge: "/pwa-192.png",
                        data: {
                            url
                        }
                    }
                );
            }
        );
    })
    .catch(error => {

        console.error(
            "POSHAN background messaging setup failed:",
            error
        );
    });

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();

        const rawUrl =
            event.notification?.data?.url
                ||
            "/notifications";

        const targetUrl =
            new URL(
                rawUrl,
                self.location.origin
            ).href;

        event.waitUntil(
            clients
                .matchAll({
                    type: "window",
                    includeUncontrolled: true
                })
                .then(windowClients => {

                    for (const client of windowClients) {

                        if (
                            "focus" in client
                                &&
                            client.url.startsWith(
                                self.location.origin
                            )
                        ) {

                            if ("navigate" in client) {
                                return client
                                    .navigate(targetUrl)
                                    .then(() => client.focus());
                            }

                            return client.focus();
                        }
                    }

                    if (clients.openWindow) {
                        return clients.openWindow(
                            targetUrl
                        );
                    }

                    return undefined;
                })
        );
    }
);

/*
============================================================
POSHAN ERP - FIREBASE CLOUD MESSAGING SERVICE WORKER
============================================================

This service worker is intentionally independent from the React app.
It stays registered with the browser so Firebase can deliver a push
message even when the ERP tab/PWA is closed.

The Firebase web configuration is public client configuration. The
Firebase service-account private key is NEVER placed in this file.
============================================================
*/

importScripts(
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);


/*
============================================================
FIREBASE INITIALIZATION
============================================================

The configuration is read from the same public Firebase web config
used by the ERP. Keeping the config initialization here makes the
background worker independent from whether a React page is running.
============================================================
*/

const firebaseConfig = {
    apiKey: "AIzaSyDPYB5PIX4b41nGY_zNTeHv29uRXB2Pw-A",
    authDomain: "poshan-erp.firebaseapp.com",
    projectId: "poshan-erp",
    storageBucket: "poshan-erp.firebasestorage.app",
    messagingSenderId: "772427143500",
    appId: "1:772427143500:web:9eade16223b6c38254d7e9"
};


if (!firebase.apps.length) {

    firebase.initializeApp(
        firebaseConfig
    );
}


const messaging =
    firebase.messaging();


/*
============================================================
BACKGROUND MESSAGE
============================================================

The backend sends a data-only FCM message. The service worker must
therefore explicitly show the OS/browser notification.
============================================================
*/

messaging.onBackgroundMessage(
    (payload) => {

        const title =
            payload?.data?.title ||
            payload?.notification?.title ||
            "POSHAN ERP";

        const body =
            payload?.data?.body ||
            payload?.notification?.body ||
            "You have a new notification.";

        const url =
            payload?.data?.url ||
            "/notifications";

        const targetType =
            payload?.data?.targetType ||
            payload?.data?.type ||
            "NOTIFICATION";

        const targetId =
            payload?.data?.targetId ||
            "";


        return self.registration.showNotification(
            title,
            {
                body,
                icon: "/pwa-192.png",
                badge: "/pwa-192.png",
                tag:
                    `poshan-${targetType}-${targetId || Date.now()}`,
                data: {
                    url
                }
            }
        );
    }
);


/*
============================================================
ACTIVATE
============================================================
*/

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(
            self.clients.claim()
        );
    }
);


/*
============================================================
NOTIFICATION CLICK
============================================================
*/

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();

        const rawUrl =
            event.notification?.data?.url ||
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

                    for (
                        const client of windowClients
                    ) {

                        if (
                            "focus" in client &&
                            client.url.startsWith(
                                self.location.origin
                            )
                        ) {

                            if (
                                "navigate" in client
                            ) {

                                return client
                                    .navigate(
                                        targetUrl
                                    )
                                    .then(
                                        () =>
                                            client.focus()
                                    );
                            }

                            return client.focus();
                        }
                    }


                    if (
                        clients.openWindow
                    ) {

                        return clients.openWindow(
                            targetUrl
                        );
                    }

                    return undefined;
                })
        );
    }
);

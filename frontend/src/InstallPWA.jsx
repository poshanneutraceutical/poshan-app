import { useEffect, useState } from "react";

function isStandalone() {
    return (
        window.matchMedia?.("(display-mode: standalone)").matches ||
        window.matchMedia?.("(display-mode: fullscreen)").matches ||
        window.navigator.standalone === true
    );
}

function isIOSDevice() {
    const ua = window.navigator.userAgent || "";
    const platform = window.navigator.platform || "";

    const touchMac =
        platform === "MacIntel" &&
        window.navigator.maxTouchPoints > 1;

    return /iPad|iPhone|iPod/i.test(ua) || touchMac;
}

export default function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [show, setShow] = useState(false);
    const [installing, setInstalling] = useState(false);
    const [ios, setIos] = useState(false);

    useEffect(() => {
        // Do not show anything when already installed.
        if (isStandalone()) {
            return;
        }

        const iosDevice = isIOSDevice();
        setIos(iosDevice);

        const dismissed = sessionStorage.getItem(
            "poshan-pwa-install-dismissed"
        );

        const beforeInstallHandler = (event) => {
            // Stop the browser's automatic install UI.
            event.preventDefault();

            // Save the install event so our button can use it.
            setDeferredPrompt(event);

            if (!dismissed) {
                setTimeout(() => {
                    setShow(true);
                }, 700);
            }
        };

        const installedHandler = () => {
            setShow(false);
            setDeferredPrompt(null);
        };

        window.addEventListener(
            "beforeinstallprompt",
            beforeInstallHandler
        );

        window.addEventListener(
            "appinstalled",
            installedHandler
        );

        /*
         * iOS does not support beforeinstallprompt.
         * Show instructions instead.
         */
        if (iosDevice && !dismissed) {
            setTimeout(() => {
                setShow(true);
            }, 1200);
        }

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                beforeInstallHandler
            );

            window.removeEventListener(
                "appinstalled",
                installedHandler
            );
        };
    }, []);

    if (!show) {
        return null;
    }

    const close = () => {
        sessionStorage.setItem(
            "poshan-pwa-install-dismissed",
            "1"
        );

        setShow(false);
    };

    const install = async () => {
        if (!deferredPrompt) {
            close();
            return;
        }

        setInstalling(true);

        try {
            await deferredPrompt.prompt();

            await deferredPrompt.userChoice;
        } catch (error) {
            console.error(
                "Poshan ERP PWA installation error:",
                error
            );
        } finally {
            setDeferredPrompt(null);
            setInstalling(false);
            setShow(false);
        }
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Install Poshan ERP"
            style={styles.overlay}
        >
            <div style={styles.card}>

                <button
                    type="button"
                    aria-label="Close"
                    onClick={close}
                    style={styles.close}
                >
                    ×
                </button>

                <img
                    src="/poshan-icon.png"
                    alt="Poshan Nutraceutical LLP"
                    style={styles.logo}
                />

                <h2 style={styles.title}>
                    Install Poshan ERP
                </h2>

                <p style={styles.text}>
                    Add Poshan ERP to your home screen
                    for quick access. Your existing ERP,
                    login and URL will remain the same.
                </p>

                {ios ? (
                    <div style={styles.steps}>

                        <strong>
                            Add to Home Screen
                        </strong>

                        <div>
                            1. Tap the
                            {" "}
                            <strong>Share</strong>
                            {" "}
                            button in Safari.
                        </div>

                        <div>
                            2. Select
                            {" "}
                            <strong>
                                Add to Home Screen
                            </strong>.
                        </div>

                        <div>
                            3. Tap
                            {" "}
                            <strong>Add</strong>.
                        </div>

                    </div>
                ) : deferredPrompt ? (
                    <button
                        type="button"
                        onClick={install}
                        disabled={installing}
                        style={{
                            ...styles.installButton,
                            ...(installing
                                ? styles.disabledButton
                                : {})
                        }}
                    >
                        {installing
                            ? "Opening install…"
                            : "Install Poshan ERP"}
                    </button>
                ) : null}

                <button
                    type="button"
                    onClick={close}
                    style={styles.laterButton}
                >
                    Not now
                </button>

            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(0, 0, 0, 0.48)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)"
    },

    card: {
        width: "min(420px, 100%)",
        position: "relative",
        borderRadius: "22px",
        background: "#ffffff",
        padding: "28px 24px 22px",
        boxShadow: "0 25px 70px rgba(0,0,0,.25)",
        textAlign: "center",
        fontFamily: "Arial, Helvetica, sans-serif"
    },

    close: {
        position: "absolute",
        top: "10px",
        right: "14px",
        border: 0,
        background: "transparent",
        fontSize: "28px",
        color: "#64748b",
        cursor: "pointer",
        lineHeight: 1
    },

    logo: {
        width: "110px",
        height: "110px",
        objectFit: "contain",
        borderRadius: "18px",
        margin: "2px auto 12px",
        display: "block"
    },

    title: {
        margin: "0 0 8px",
        color: "#10261e",
        fontSize: "24px"
    },

    text: {
        margin: "0 auto 18px",
        color: "#64748b",
        fontSize: "15px",
        lineHeight: 1.55,
        maxWidth: "340px"
    },

    steps: {
        textAlign: "left",
        background: "#f3f7f5",
        border: "1px solid #dbe8e1",
        borderRadius: "14px",
        padding: "14px 16px",
        color: "#334155",
        fontSize: "14px",
        lineHeight: 1.65,
        marginBottom: "16px"
    },

    installButton: {
        width: "100%",
        border: 0,
        borderRadius: "12px",
        background: "#0b3d2e",
        color: "#ffffff",
        padding: "13px 16px",
        fontSize: "16px",
        fontWeight: 700,
        cursor: "pointer",
        marginBottom: "10px"
    },

    disabledButton: {
        opacity: 0.7,
        cursor: "wait"
    },

    laterButton: {
        width: "100%",
        border: "1px solid #d7dee8",
        borderRadius: "12px",
        background: "#ffffff",
        color: "#475569",
        padding: "11px 16px",
        fontSize: "15px",
        cursor: "pointer"
    }
};
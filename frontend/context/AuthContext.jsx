import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import AuthService
    from "../services/AuthService";

import initializePushNotifications
    from "../services/pushNotificationService";

import {
    unregisterCurrentPushDevice
} from "../services/pushNotificationService";


const AuthContext = createContext();


/*
============================================================
ROLE NORMALIZATION
============================================================
*/

const normalizeRole = (role) => {

    if (typeof role === "string") {

        return role
            .replace(/^ROLE_/i, "")
            .trim()
            .toUpperCase();
    }


    if (role && typeof role === "object") {

        return String(
            role.name ||
            role.authority ||
            role.role ||
            ""
        )
            .replace(/^ROLE_/i, "")
            .trim()
            .toUpperCase();
    }


    return "";
};


/*
============================================================
BUILD USER DATA
============================================================

The login API returns employeeId, while /auth/me returns the
current user profile. We preserve the existing local user shape
so the rest of the ERP does not need to change.
============================================================
*/

const mergeUserProfile = (
    storedUser,
    profile
) => {

    const roles =
        Array.isArray(profile?.roles)
            ? profile.roles
                .map(normalizeRole)
                .filter(Boolean)
            : Array.isArray(storedUser?.roles)
                ? storedUser.roles
                    .map(normalizeRole)
                    .filter(Boolean)
                : [];


    const primaryRole =
        roles.length > 0
            ? roles[0]
            : normalizeRole(
                storedUser?.role
            );


    return {
        ...(storedUser || {}),

        id:
            profile?.id ??
            storedUser?.id ??
            null,

        username:
            profile?.username ||
            storedUser?.username ||
            "",

        name:
            profile?.name ||
            storedUser?.name ||
            "",

        employeeId:
            storedUser?.employeeId ??
            null,

        email:
            profile?.email ||
            storedUser?.email ||
            "",

        roles,

        role:
            primaryRole,

        position:
            profile?.position ??
            storedUser?.position ??
            null
    };
};


export function AuthProvider({ children }) {

    const [user, setUser] =
        useState(null);

    const [token, setToken] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    /*
    ========================================================
    RESTORE LOGIN AFTER APP / PWA REOPEN
    ========================================================

    localStorage survives a normal browser/PWA close. The old
    implementation restored only the cached user object. The new
    implementation restores BOTH token and user, then validates the
    token with /api/auth/me.

    If the server is temporarily unreachable, the cached login is
    kept so simply reopening the app does not force a new login.
    Only a real 401 clears the stored session.
    ========================================================
    */

    useEffect(() => {

        let active = true;


        const restoreSession = async () => {

            const storedToken =
                AuthService.getToken();

            const storedUser =
                AuthService.getUser();


            if (!storedToken || !storedUser) {

                if (storedToken && !storedUser) {
                    AuthService.clearAuth();
                }

                if (storedUser && !storedToken) {
                    AuthService.clearAuth();
                }

                if (active) {
                    setUser(null);
                    setToken(null);
                    setLoading(false);
                }

                return;
            }


            if (active) {
                setToken(storedToken);
                setUser(storedUser);
            }


            try {

                const profile =
                    await AuthService.getCurrentUser();


                if (!active) {
                    return;
                }


                const restoredUser =
                    mergeUserProfile(
                        storedUser,
                        profile
                    );


                AuthService.saveUser(
                    restoredUser
                );

                setUser(restoredUser);

            } catch (error) {

                if (
                    error?.response?.status === 401
                ) {

                    AuthService.clearAuth();

                    if (active) {
                        setUser(null);
                        setToken(null);
                    }

                } else {

                    /*
                     * Network/server failure is NOT treated as a logout.
                     * The already-persisted JWT/user remain available.
                     */

                    console.warn(
                        "POSHAN session validation could not be completed. Keeping the stored session.",
                        error
                    );
                }

            } finally {

                if (active) {
                    setLoading(false);
                }
            }
        };


        restoreSession();


        return () => {
            active = false;
        };

    }, []);


    /*
    ========================================================
    RESTORE / REGISTER PUSH AFTER LOGIN OR APP REOPEN
    ========================================================

    Push registration is intentionally independent from the
    notification bell. Once the browser has already granted
    notification permission, the FCM installation is registered
    automatically at startup.

    The browser/device can continue receiving FCM messages while
    the React app is closed because the service worker handles the
    background message.
    ========================================================
    */

    useEffect(() => {

        if (!user?.id) {
            return undefined;
        }


        let cancelled = false;


        const setupPush = async () => {

            try {

                await initializePushNotifications({
                    requestPermission: false,
                    userId: user.id
                });

            } catch (error) {

                if (!cancelled) {

                    console.error(
                        "POSHAN background push initialization failed:",
                        error
                    );
                }
            }
        };


        setupPush();


        return () => {
            cancelled = true;
        };

    }, [user?.id]);


    /*
    ========================================================
    LOGIN
    ========================================================
    */

    const login = (
        userData,
        newToken
    ) => {

        AuthService.saveToken(
            newToken
        );

        AuthService.saveUser(
            userData
        );

        setToken(newToken);
        setUser(userData);

        /*
         * Start push registration immediately after login when
         * permission has already been granted. The notification
         * bell can still request permission through its own click.
         */

        initializePushNotifications({
            requestPermission: false,
            userId: userData?.id
        }).catch(error => {

            console.error(
                "POSHAN push initialization after login failed:",
                error
            );
        });
    };


    /*
    ========================================================
    LOGOUT
    ========================================================

    Closing the app DOES NOT call this function.

    Only an explicit logout removes the push-device association.
    That is what allows a closed-but-still-logged-in user to keep
    receiving background notifications.
    ========================================================
    */

    const logout = async () => {

        try {

            await unregisterCurrentPushDevice();

        } catch (error) {

            console.error(
                "POSHAN push device cleanup during logout failed:",
                error
            );
        }

        await AuthService.logout();

        setToken(null);
        setUser(null);
    };


    const value = useMemo(
        () => ({
            user,
            token,
            loading,
            login,
            logout,
            isAuthenticated:
                Boolean(
                    token && user
                )
        }),
        [
            user,
            token,
            loading
        ]
    );


    return (

        <AuthContext.Provider
            value={value}
        >

            {children}

        </AuthContext.Provider>

    );
}


export function useAuth() {

    return useContext(
        AuthContext
    );
}

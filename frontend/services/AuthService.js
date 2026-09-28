import api from "./api";

const AUTH_BASE = "/auth";

const AuthService = {

    async login(credentials) {

        const response =
            await api.post(
                `${AUTH_BASE}/login`,
                credentials
            );

        return response.data;

    },


    async logout() {

        try {

            await api.post(
                `${AUTH_BASE}/logout`
            );

        } catch (e) {

            /*
             * The backend currently does not need a server-side
             * logout session because the ERP uses stateless JWTs.
             * Local authentication state is cleared below regardless
             * of whether the optional API call exists.
             */
        }

        this.clearAuth();

    },


    async getCurrentUser() {

        const response =
            await api.get(
                `${AUTH_BASE}/me`
            );

        return response.data;

    },


    async refreshToken(refreshToken) {

        const response =
            await api.post(
                `${AUTH_BASE}/refresh-token`,
                {
                    refreshToken
                }
            );

        return response.data;

    },


    async changePassword(data) {

        const response =
            await api.put(
                `${AUTH_BASE}/change-password`,
                data
            );

        return response.data;

    },


    async updateProfile(data) {

        const response =
            await api.put(
                `${AUTH_BASE}/profile`,
                data
            );

        return response.data;

    },


    saveToken(token) {

        if (!token) {
            return;
        }

        localStorage.setItem(
            "token",
            token
        );

    },


    getToken() {

        return localStorage.getItem(
            "token"
        );

    },


    saveUser(user) {

        if (!user) {
            return;
        }

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

    },


    getUser() {

        const user =
            localStorage.getItem(
                "user"
            );

        if (
            !user ||
            user === "undefined" ||
            user === "null"
        ) {
            return null;
        }

        try {

            return JSON.parse(
                user
            );

        } catch (e) {

            localStorage.removeItem(
                "user"
            );

            return null;
        }

    },


    clearAuth() {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

    },


    isAuthenticated() {

        return Boolean(
            localStorage.getItem(
                "token"
            )
        );

    }

};

export default AuthService;

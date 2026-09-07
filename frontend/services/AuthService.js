import api from "./api";

const AUTH_BASE = "/auth";

const AuthService = {

    async login(credentials) {

        const response = await api.post(
            `${AUTH_BASE}/login`,
            credentials
        );

        return response.data;

    },

    async logout() {

        try {

            await api.post(`${AUTH_BASE}/logout`);

        } catch (e) {

            // Ignore API logout errors

        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

    },

    async getCurrentUser() {

        const response = await api.get(
            `${AUTH_BASE}/me`
        );

        return response.data;

    },

    async refreshToken(refreshToken) {

        const response = await api.post(
            `${AUTH_BASE}/refresh-token`,
            {
                refreshToken
            }
        );

        return response.data;

    },

    async changePassword(data) {

        const response = await api.put(
            `${AUTH_BASE}/change-password`,
            data
        );

        return response.data;

    },

    async updateProfile(data) {

        const response = await api.put(
            `${AUTH_BASE}/profile`,
            data
        );

        return response.data;

    },

    saveToken(token) {

        localStorage.setItem("token", token);

    },

    getToken() {

        return localStorage.getItem("token");

    },

    saveUser(user) {

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

    },

   getUser() {

       const user = localStorage.getItem("user");

       if (!user || user === "undefined") {
           return null;
       }

       try {
           return JSON.parse(user);
       } catch (e) {
           localStorage.removeItem("user");
           return null;
       }

   },

    isAuthenticated() {

        return !!localStorage.getItem("token");

    }

};

export default AuthService;
import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL || "/api",

    timeout: 30000
});


/*
============================================================
ATTACH JWT
============================================================
*/

api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }


        /*
         ==========================================
         FORM DATA
         ==========================================

         Browser/Axios creates the multipart boundary.
         */

        if (
            config.data instanceof FormData
        ) {

            delete config.headers[
                "Content-Type"
            ];

        } else {

            config.headers[
                "Content-Type"
            ] = "application/json";
        }

        return config;

    },

    (error) =>
        Promise.reject(error)
);


/*
============================================================
AUTHENTICATION FAILURE
============================================================

A 401 means the server rejected the JWT. This is different from
closing the browser/PWA: closing it does not clear localStorage.

The redirect is corrected to the actual login route used by
AppRoutes: "/".
============================================================
*/

api.interceptors.response.use(

    (response) =>
        response,

    (error) => {

        if (
            error.response?.status === 401
        ) {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            /*
             * Let AuthContext update React state immediately when
             * possible. The storage removal above also protects a
             * full page reload where React state no longer exists.
             */

            window.dispatchEvent(
                new Event(
                    "poshan-auth-expired"
                )
            );


            if (
                window.location.pathname !== "/"
                    &&
                window.location.pathname !== "/login"
            ) {

                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);


export default api;

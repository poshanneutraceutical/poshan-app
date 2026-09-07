import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://localhost:8080/api",

    timeout: 30000
});


api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        /*
         ==========================================
         FORM DATA
         ==========================================
         */

        if (config.data instanceof FormData) {

            /*
             Do NOT set Content-Type manually.
             Browser/Axios will automatically set:

             multipart/form-data;
             boundary=....
            */

            delete config.headers["Content-Type"];

        }

        /*
         ==========================================
         NORMAL JSON REQUESTS
         ==========================================
         */

        else {

            config.headers["Content-Type"] =
                "application/json";

        }

        return config;

    },

    (error) =>
        Promise.reject(error)
);


api.interceptors.response.use(

    (response) =>
        response,

    (error) => {

        if (
            error.response?.status === 401
        ) {

            localStorage.removeItem("token");

            localStorage.removeItem("user");


            if (
                window.location.pathname !==
                "/login"
            ) {

                window.location.href =
                    "/login";

            }

        }

        return Promise.reject(error);

    }

);


export default api;
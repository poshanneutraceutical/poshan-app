import axios from "axios";

const API_ROOT =
    import.meta.env.VITE_API_BASE_URL
        ? String(
            import.meta.env.VITE_API_BASE_URL
        ).replace(/\/$/, "")
        : (
            window.location.hostname === "localhost"
                ? "http://localhost:8086/api"
                : "/api"
        );

const API_URL = `${API_ROOT}/stickers`;

const getToken = () => {

    return (
        localStorage.getItem("token")
        ||
        localStorage.getItem("accessToken")
        ||
        localStorage.getItem("jwt")
        ||
        localStorage.getItem("authToken")
        ||
        ""
    );
};

const getAuthConfig = () => {

    const token = getToken();

    return token
        ? {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        : {};
};

const StickerService = {

    getAllStickers: async () => {

        const response =
            await axios.get(
                API_URL,
                getAuthConfig()
            );

        return response.data;
    },

    getStickerById: async (id) => {

        const response =
            await axios.get(
                `${API_URL}/${id}`,
                getAuthConfig()
            );

        return response.data;
    },

    createSticker: async (formData) => {

        const authConfig = getAuthConfig();

        const response =
            await axios.post(
                API_URL,
                formData,
                {
                    ...authConfig,
                    headers: {
                        ...(authConfig.headers || {}),
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

        return response.data;
    },

    deleteSticker: async (id) => {

        await axios.delete(
            `${API_URL}/${id}`,
            getAuthConfig()
        );
    }
};

export const resolveStickerImageUrl = (
    imagePath
) => {

    if (!imagePath) {
        return "";
    }

    if (/^https?:\/\//i.test(imagePath)) {
        return imagePath;
    }

    if (imagePath.startsWith("//")) {
        return `https:${imagePath}`;
    }

    const apiOrigin =
        /^https?:\/\//i.test(API_ROOT)
            ? API_ROOT.replace(
                /\/api\/?$/i,
                ""
            )
            : window.location.origin;

    return (
        `${apiOrigin}`
        +
        (
            imagePath.startsWith("/")
                ? imagePath
                : `/${imagePath}`
        )
    );
};

export default StickerService;

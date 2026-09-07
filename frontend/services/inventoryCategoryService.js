import api from "./api";

const BASE_URL =
    "/inventory-categories";

const inventoryCategoryService = {

    getAll: async () => {

        const response =
            await api.get(
                BASE_URL
            );

        return response.data;
    },


    getById: async (
        id
    ) => {

        const response =
            await api.get(
                `${BASE_URL}/${id}`
            );

        return response.data;
    },


    create: async (
        data
    ) => {

        const response =
            await api.post(
                BASE_URL,
                data
            );

        return response.data;
    },


    update: async (
        id,
        data
    ) => {

        const response =
            await api.put(
                `${BASE_URL}/${id}`,
                data
            );

        return response.data;
    },


    deactivate: async (
        id
    ) => {

        const response =
            await api.delete(
                `${BASE_URL}/${id}`
            );

        return response.data;
    }

};

export default inventoryCategoryService;
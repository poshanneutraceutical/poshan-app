import api from "./api";

const BASE_URL =
    "/inventory";

const inventoryService = {

    getAll: async () => {

        const response =
            await api.get(
                BASE_URL
            );

        return response.data;
    },


    getCategorySummary: async () => {

        const response =
            await api.get(
                `${BASE_URL}/category-summary`
            );

        return response.data;
    },


    getByCategory: async (
        categoryId
    ) => {

        const response =
            await api.get(
                `${BASE_URL}/category/${categoryId}`
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


    getByBoxType: async (
        boxType
    ) => {

        const response =
            await api.get(
                `${BASE_URL}/box/${boxType}`
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


    delete: async (
        id
    ) => {

        const response =
            await api.delete(
                `${BASE_URL}/${id}`
            );

        return response.data;
    },


    getLowStockItems: async () => {

        const response =
            await api.get(
                `${BASE_URL}/low-stock`
            );

        return response.data;
    }

};

export default inventoryService;
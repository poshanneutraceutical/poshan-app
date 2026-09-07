import api from "./api";


const deliveryService = {

    // =========================================================
    // CREATE SINGLE DELIVERY
    // =========================================================

    create: async (data) => {

        const response =
            await api.post(
                "/sales/delivery",
                data
            );

        return response.data;
    },


    // =========================================================
    // CREATE MULTIPLE DELIVERIES
    // =========================================================

    createBulk: async (data) => {

        const response =
            await api.post(
                "/sales/delivery/bulk",
                data
            );

        return response.data;
    },


    // =========================================================
    // UPDATE DELIVERY
    // =========================================================

    update: async (id, data) => {

        const response =
            await api.put(
                `/sales/delivery/${id}`,
                data
            );

        return response.data;
    },


    // =========================================================
    // GET ALL DELIVERIES
    // =========================================================

    getAll: async () => {

        const response =
            await api.get(
                "/sales/delivery"
            );

        return response.data;
    },


    // =========================================================
    // COMPANY SUMMARY
    // =========================================================

    getCompanySummary: async () => {

        const response =
            await api.get(
                "/sales/delivery/company-summary"
            );

        return response.data;
    },


    // =========================================================
    // GET COMPANY DELIVERIES
    // =========================================================

    getByCompany: async (companyId) => {

        const response =
            await api.get(
                `/sales/delivery/company/${companyId}`
            );

        return response.data;
    },


    // =========================================================
    // GET DELIVERY BY ID
    // =========================================================

    getById: async (id) => {

        const response =
            await api.get(
                `/sales/delivery/${id}`
            );

        return response.data;
    },


    // =========================================================
    // DELETE
    // =========================================================

    delete: async (id) => {

        const response =
            await api.delete(
                `/sales/delivery/${id}`
            );

        return response.data;
    },


    // =========================================================
    // GET INVENTORY CATEGORIES
    // =========================================================

    getInventoryCategories: async () => {

        const response =
            await api.get(
                "/inventory/categories"
            );

        return response.data;
    },


    // =========================================================
    // GET MATERIALS BY CATEGORY
    // =========================================================

    getMaterialsByCategory: async (
        categoryId
    ) => {

        const response =
            await api.get(
                `/inventory/materials/category/${categoryId}`
            );

        return response.data;
    }

};


export default deliveryService;
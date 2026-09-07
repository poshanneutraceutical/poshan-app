import api from "./api";

const API_URL = "/mrp";

const MRPService = {

    // =========================================================
    // CREATE MRP
    // =========================================================

    createMRP: async (mrpData) => {

        const response = await api.post(
            API_URL,
            mrpData
        );

        return response.data;
    },


    // =========================================================
    // CREATE MRP - BACKWARD COMPATIBILITY
    // =========================================================

    createMrp: async (mrpData) => {

        const response = await api.post(
            API_URL,
            mrpData
        );

        return response.data;
    },


    // =========================================================
    // GET ALL MRP
    // =========================================================

    getAllMRP: async () => {

        const response = await api.get(
            API_URL
        );

        return response.data;
    },


    // =========================================================
    // GET ALL MRP - BACKWARD COMPATIBILITY
    // =========================================================

    getAllMrp: async () => {

        const response = await api.get(
            API_URL
        );

        return response.data;
    },


    // =========================================================
    // GET MRP BY ID
    // =========================================================

    getMRPById: async (id) => {

        const response = await api.get(
            `${API_URL}/${id}`
        );

        return response.data;
    },


    // =========================================================
    // GET MRP BY ID - BACKWARD COMPATIBILITY
    // =========================================================

    getMrpById: async (id) => {

        const response = await api.get(
            `${API_URL}/${id}`
        );

        return response.data;
    },


    // =========================================================
    // UPDATE MRP
    // =========================================================

    updateMRP: async (id, mrpData) => {

        const response = await api.put(
            `${API_URL}/${id}`,
            mrpData
        );

        return response.data;
    },


    // =========================================================
    // UPDATE MRP - BACKWARD COMPATIBILITY
    // =========================================================

    updateMrp: async (id, mrpData) => {

        const response = await api.put(
            `${API_URL}/${id}`,
            mrpData
        );

        return response.data;
    },


    // =========================================================
    // DELETE MRP
    // =========================================================

    deleteMRP: async (id) => {

        const response = await api.delete(
            `${API_URL}/${id}`
        );

        return response.data;
    },


    // =========================================================
    // DELETE MRP - BACKWARD COMPATIBILITY
    // =========================================================

    deleteMrp: async (id) => {

        const response = await api.delete(
            `${API_URL}/${id}`
        );

        return response.data;
    }

};

export default MRPService;
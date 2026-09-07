import api from "./api";

const PRODUCTION_BASE_URL =
    "/production";

const ProductionService = {

    createPlan: async (
        planData
    ) => {

        const response =
            await api.post(
                PRODUCTION_BASE_URL,
                planData
            );

        return response.data;
    },


    getAllPlans: async () => {

        const response =
            await api.get(
                PRODUCTION_BASE_URL
            );

        return response.data;
    },


    getPlanById: async (
        id
    ) => {

        const response =
            await api.get(
                `${PRODUCTION_BASE_URL}/${id}`
            );

        return response.data;
    },


    updatePlan: async (
        id,
        planData
    ) => {

        const response =
            await api.put(
                `${PRODUCTION_BASE_URL}/${id}`,
                planData
            );

        return response.data;
    },


    deletePlan: async (
        id
    ) => {

        const response =
            await api.delete(
                `${PRODUCTION_BASE_URL}/${id}`
            );

        return response.data;
    }

};

export default ProductionService;
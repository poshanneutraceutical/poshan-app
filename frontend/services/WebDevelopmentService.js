import api from "./api";

const BASE_URL = "/web/development";

const webDevelopmentService = {

    // ==========================
    // GET ALL PROJECTS
    // ==========================
    getAll: async () => {

        const response = await api.get(BASE_URL);

        return response.data;

    },

    // ==========================
    // GET PROJECT BY ID
    // ==========================
    getById: async (id) => {

        const response = await api.get(
            `${BASE_URL}/${id}`
        );

        return response.data;

    },

    // ==========================
    // CREATE PROJECT
    // ==========================
    create: async (projectData) => {

        const response = await api.post(
            BASE_URL,
            projectData
        );

        return response.data;

    },

    // ==========================
    // UPDATE PROJECT
    // ==========================
    update: async (id, projectData) => {

        const response = await api.put(
            `${BASE_URL}/${id}`,
            projectData
        );

        return response.data;

    },

    // ==========================
    // DELETE PROJECT
    // ==========================
    delete: async (id) => {

        const response = await api.delete(
            `${BASE_URL}/${id}`
        );

        return response.data;

    }

};

export default webDevelopmentService;
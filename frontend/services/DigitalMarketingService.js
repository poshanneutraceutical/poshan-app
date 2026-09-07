import api from "./api";

const BASE_URL = "/digital/marketing";

const DigitalMarketingService = {

    getAllProjects() {
        return api.get(BASE_URL);
    },

    getProjectById(id) {
        return api.get(`${BASE_URL}/${id}`);
    },

    createProject(project) {
        return api.post(BASE_URL, project);
    },

    updateProject(id, project) {
        return api.put(`${BASE_URL}/${id}`, project);
    },

    deleteProject(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }

};

export default DigitalMarketingService;
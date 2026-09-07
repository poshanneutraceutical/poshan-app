import api from "./api";

const BASE_URL = "/designing/dashboard";

const DesigningDashboardService = {

    getDashboardData() {
        return api.get(BASE_URL);
    },

    getStatistics() {
        return api.get(`${BASE_URL}/statistics`);
    },

    getTasks() {
        return api.get(`${BASE_URL}/tasks`);
    },

    getPerformance() {
        return api.get(`${BASE_URL}/performance`);
    }

};

export default DesigningDashboardService;
import api from "./api";

const BASE_URL = "/web/dashboard";

const webDashboardService = {

    getDashboardData: async () => {

        const response = await api.get(BASE_URL);

        return response.data;

    }

};

export default webDashboardService;
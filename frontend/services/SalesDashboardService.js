import api from "./api";

const BASE_URL = "/sales/dashboard";

const salesDashboardService = {

    // ==========================
    // GET SALES DASHBOARD
    // ==========================
    getDashboard: async () => {

        const response = await api.get(BASE_URL);

        return response.data;

    }

};

export default salesDashboardService;
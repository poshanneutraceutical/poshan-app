import api from "./api";

const BASE_URL = "/digital/dashboard";

const DigitalDashboardService = {

    getDashboardData() {
        return api.get(BASE_URL);
    }

};

export default DigitalDashboardService;
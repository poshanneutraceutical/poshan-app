import api from "./api";

const dashboardService = {

  // Main ERP Dashboard
  getDashboard: async () => {
    const response = await api.get("/dashboard");
    return response.data;
  },

  // Inventory Dashboard
  getInventoryDashboard: async () => {
    const response = await api.get("/inventory/dashboard");
    return response.data;
  },

  // Sales Dashboard
  getSalesDashboard: async () => {
    const response = await api.get("/sales/dashboard");
    return response.data;
  },

  // Designing Dashboard
  getDesignDashboard: async () => {
    const response = await api.get("/designing/dashboard");
    return response.data;
  },

  // Digital Dashboard
  getDigitalDashboard: async () => {
    const response = await api.get("/digital/dashboard");
    return response.data;
  },

  // Web Dashboard
  getWebDashboard: async () => {
    const response = await api.get("/web/dashboard");
    return response.data;
  }

};

export default dashboardService;
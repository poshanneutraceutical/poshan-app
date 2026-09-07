import api from "./api";

const BASE_URL = "/reports";

const reportService = {
  getPurchaseReport: async (params = {}) => {
    const response = await api.get(
      `${BASE_URL}/purchase`,
      {
        params
      }
    );

    return response.data;
  },

  getInventoryReport: async (params = {}) => {
    const response = await api.get(
      `${BASE_URL}/inventory`,
      {
        params
      }
    );

    return response.data;
  },

  getVendorReport: async (params = {}) => {
    const response = await api.get(
      `${BASE_URL}/vendors`,
      {
        params
      }
    );

    return response.data;
  },

  getEmployeeReport: async (params = {}) => {
    const response = await api.get(
      `${BASE_URL}/employees`,
      {
        params
      }
    );

    return response.data;
  },

  exportPdf: async (
    reportType,
    params = {}
  ) => {
    const response = await api.get(
      `${BASE_URL}/${reportType}/pdf`,
      {
        params,
        responseType: "blob"
      }
    );

    return response.data;
  },

  exportExcel: async (
    reportType,
    params = {}
  ) => {
    const response = await api.get(
      `${BASE_URL}/${reportType}/excel`,
      {
        params,
        responseType: "blob"
      }
    );

    return response.data;
  },

  exportCsv: async (
    reportType,
    params = {}
  ) => {
    const response = await api.get(
      `${BASE_URL}/${reportType}/csv`,
      {
        params,
        responseType: "blob"
      }
    );

    return response.data;
  }
};

export default reportService;
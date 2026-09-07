import api from "./api";

const BASE_URL = "/procurement/vendors";

const vendorService = {

  getAll: async (params = {}) => {

    const response = await api.get(
      BASE_URL,
      {
        params
      }
    );

    return response.data;

  },



  getById: async (id) => {

    const response = await api.get(
      `${BASE_URL}/${id}`
    );

    return response.data;

  },



  create: async (vendor) => {

    const response = await api.post(
      BASE_URL,
      vendor
    );

    return response.data;

  },



  update: async (id, vendor) => {

    const response = await api.put(
      `${BASE_URL}/${id}`,
      vendor
    );

    return response.data;

  },



  delete: async (id) => {

    const response = await api.delete(
      `${BASE_URL}/${id}`
    );

    return response.data;

  },



  search: async (keyword) => {

    const response = await api.get(
      `${BASE_URL}/search`,
      {
        params: {
          keyword
        }
      }
    );

    return response.data;

  },



  getPaginated: async (
    page = 0,
    size = 10,
    sort = "id"
  ) => {

    const response = await api.get(
      `${BASE_URL}/page`,
      {
        params: {
          page,
          size,
          sort
        }
      }
    );

    return response.data;

  },



  updateStatus: async (
    id,
    status
  ) => {

    const response = await api.patch(
      `${BASE_URL}/${id}/status`,
      {
        status
      }
    );

    return response.data;

  }

};

export default vendorService;
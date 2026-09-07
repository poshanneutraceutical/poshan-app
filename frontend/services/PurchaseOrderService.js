import api from "./api";

const BASE_URL = "/procurement/purchase-orders";

const purchaseOrderService = {

    /*
     ==========================================
     GET ALL PURCHASE ORDERS
     ==========================================
    */

    getAll: async () => {

        const response =
            await api.get(BASE_URL);

        return response.data;

    },



    /*
     ==========================================
     GET PURCHASE ORDER BY ID
     ==========================================
    */

    getById: async (id) => {

        const response =
            await api.get(
                `${BASE_URL}/${id}`
            );

        return response.data;

    },



    /*
     ==========================================
     GET PURCHASE ORDER DETAILS
     ==========================================
    */

    getDetails: async (id) => {

        const response =
            await api.get(
                `${BASE_URL}/${id}/details`
            );

        return response.data;

    },



    /*
     ==========================================
     CREATE PURCHASE ORDER FROM PR
     ==========================================
    */

    createFromPR: async (prId) => {

        const response =
            await api.post(
                `${BASE_URL}/create/${prId}`
            );

        return response.data;

    },



    /*
     ==========================================
     SEND PURCHASE ORDER TO VENDOR
     ==========================================
    */

    sendToVendor: async (id) => {

        const response =
            await api.post(
                `${BASE_URL}/${id}/send`
            );

        return response.data;

    },



    /*
     ==========================================
     UPDATE PURCHASE ORDER STATUS
     ==========================================
    */

    updateStatus: async (
        id,
        status
    ) => {

        const response =
            await api.put(
                `${BASE_URL}/${id}/status`,
                {
                    status
                }
            );

        return response.data;

    },



    /*
     ==========================================
     CANCEL PURCHASE ORDER
     ==========================================
    */

    cancel: async (id) => {

        const response =
            await api.delete(
                `${BASE_URL}/${id}`
            );

        return response.data;

    }

};

export default purchaseOrderService;
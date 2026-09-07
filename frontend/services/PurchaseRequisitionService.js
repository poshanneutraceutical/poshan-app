import api from "./api";

const BASE_URL = "/procurement/pr";
const APPROVAL_URL = "/approval/pr";

const purchaseRequisitionService = {

    /*
     ==========================================
     GET ALL PURCHASE REQUISITIONS
     ==========================================
    */
    getAll: async () => {

        const response = await api.get(BASE_URL);

        return response.data;

    },



    /*
     ==========================================
     GET PURCHASE REQUISITION BY ID
     ==========================================
    */
    getById: async (id) => {

        const response = await api.get(
            `${BASE_URL}/${id}`
        );

        return response.data;

    },



    /*
     ==========================================
     CREATE PURCHASE REQUISITION
     ==========================================
    */
    create: async (data) => {

        const response = await api.post(
            BASE_URL,
            data
        );

        return response.data;

    },



    /*
     ==========================================
     UPDATE PURCHASE REQUISITION
     ==========================================
    */
    update: async (id, data) => {

        const response = await api.put(
            `${BASE_URL}/${id}`,
            data
        );

        return response.data;

    },



    /*
     ==========================================
     DELETE PURCHASE REQUISITION
     ==========================================
    */
    delete: async (id) => {

        const response = await api.delete(
            `${BASE_URL}/${id}`
        );

        return response.data;

    },



    /*
     ==========================================
     APPROVE PURCHASE REQUISITION
     ==========================================
    */
    approve: async (
        id,
        approvedBy = "System"
    ) => {

        const response = await api.post(
            `${APPROVAL_URL}/${id}/approve`,
            {
                approvedBy
            }
        );

        return response.data;

    },



    /*
     ==========================================
     REJECT PURCHASE REQUISITION
     ==========================================
    */
    reject: async (
        id,
        approvedBy = "System",
        rejectionReason = ""
    ) => {

        const response = await api.post(
            `${APPROVAL_URL}/${id}/reject`,
            {
                approvedBy,
                rejectionReason
            }
        );

        return response.data;

    }

};

export default purchaseRequisitionService;
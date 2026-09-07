import api from "./api";

const BASE_URL = "/approval/pr";

const approvalService = {

    // ==========================================
    // GET PENDING APPROVALS
    // ==========================================

    getPendingApprovals: async () => {

        try {

            const response = await api.get(
                `${BASE_URL}/pending`
            );

            console.log(
                "Pending Approval API Response:",
                response.data
            );

            // Backend returns:
            // [
            //   { id: 1, prNumber: "...", ... }
            // ]

            if (Array.isArray(response.data)) {

                return response.data;

            }

            // Some APIs may wrap the array
            // inside { data: [...] }

            if (
                response.data &&
                Array.isArray(response.data.data)
            ) {

                return response.data.data;

            }

            console.error(
                "Unexpected pending approval response:",
                response.data
            );

            return [];

        } catch (error) {

            console.error(
                "Failed to load pending approvals:",
                error
            );

            console.error(
                "Backend error:",
                error?.response?.data
            );

            throw error;

        }

    },


    // ==========================================
    // GET APPROVED APPROVALS
    // ==========================================

    getApprovedApprovals: async () => {

        const response = await api.get(
            `${BASE_URL}/approved`
        );

        return Array.isArray(response.data)
            ? response.data
            : [];

    },


    // ==========================================
    // GET REJECTED APPROVALS
    // ==========================================

    getRejectedApprovals: async () => {

        const response = await api.get(
            `${BASE_URL}/rejected`
        );

        return Array.isArray(response.data)
            ? response.data
            : [];

    },


    // ==========================================
    // APPROVE
    // ==========================================

    approveRequest: async (
        id,
        approvedBy,
        rejectionReason = ""
    ) => {

        const response = await api.post(
            `${BASE_URL}/${id}/approve`,
            {
                approvedBy,
                rejectionReason
            }
        );

        return response.data;

    },


    // ==========================================
    // REJECT
    // ==========================================

    rejectRequest: async (
        id,
        approvedBy,
        rejectionReason = ""
    ) => {

        const response = await api.post(
            `${BASE_URL}/${id}/reject`,
            {
                approvedBy,
                rejectionReason
            }
        );

        return response.data;

    }

};

export default approvalService;
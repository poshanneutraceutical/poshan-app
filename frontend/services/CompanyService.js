import api from "./api";

const COMPANY_BASE_URL = "/sales";

const CompanyService = {

    // ==========================================
    // GET ALL COMPANIES
    // ==========================================

    getAllCompanies: async () => {

        const response = await api.get(
            `${COMPANY_BASE_URL}/companies`
        );

        return response.data;
    },


    // ==========================================
    // GET COMPLETE COMPANY PAGE
    // ==========================================

    getCompanyById: async (id) => {

        const response = await api.get(
            `${COMPANY_BASE_URL}/company/${id}`
        );

        return response.data;
    },


    // ==========================================
    // GET COMPANY NAME FOR EDIT
    // ==========================================

    getCompanyForEdit: async (id) => {

        const response = await api.get(
            `${COMPANY_BASE_URL}/company/edit/${id}`
        );

        return response.data;
    },


    // ==========================================
    // CREATE COMPANY
    // ==========================================

    createCompany: async (companyData) => {

        const response = await api.post(
            `${COMPANY_BASE_URL}/company`,
            companyData
        );

        return response.data;
    },


    // ==========================================
    // UPDATE COMPANY
    // ==========================================

    updateCompany: async (id, companyData) => {

        const response = await api.put(
            `${COMPANY_BASE_URL}/company/${id}`,
            companyData
        );

        return response.data;
    },


    // ==========================================
    // DELETE COMPANY
    // ==========================================

    deleteCompany: async (id) => {

        const response = await api.delete(
            `${COMPANY_BASE_URL}/company/${id}`
        );

        return response.data;
    },


    // ==========================================
    // CREATE COMPANY DETAIL
    // ==========================================

    createCompanyDetail: async (detailData) => {

        const response = await api.post(
            `${COMPANY_BASE_URL}/company-detail`,
            detailData
        );

        return response.data;
    },


    // ==========================================
    // UPDATE COMPANY DETAIL
    // ==========================================

    updateCompanyDetail: async (id, detailData) => {

        const response = await api.put(
            `${COMPANY_BASE_URL}/company-detail/${id}`,
            detailData
        );

        return response.data;
    },


    // ==========================================
    // CREATE CUSTOM FIELD
    // ==========================================

    createCustomField: async (fieldData) => {

        const response = await api.post(
            `${COMPANY_BASE_URL}/custom-field`,
            fieldData
        );

        return response.data;
    },


    // ==========================================
    // UPDATE CUSTOM FIELD
    // ==========================================

    updateCustomField: async (id, fieldData) => {

        const response = await api.put(
            `${COMPANY_BASE_URL}/custom-field/${id}`,
            fieldData
        );

        return response.data;
    }

};

export default CompanyService;
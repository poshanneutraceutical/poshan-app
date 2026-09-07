import api from "./api";

const SALES_URL = "/sales";


// Create Company
export const createCompany = async (data) => {
    const response = await api.post(
        `${SALES_URL}/company`,
        data
    );
    return response.data;
};


// Update Company
export const updateCompany = async (id, data) => {
    const response = await api.put(
        `${SALES_URL}/company/${id}`,
        data
    );
    return response.data;
};


// Get All Companies
export const getCompanies = async () => {
    const response = await api.get(
        `${SALES_URL}/companies`
    );
    return response.data;
};


// Get Company Full Page
export const getCompanyPage = async (id) => {
    const response = await api.get(
        `${SALES_URL}/company/${id}`
    );
    return response.data;
};


// Delete Company
export const deleteCompany = async (id) => {
    const response = await api.delete(
        `${SALES_URL}/company/${id}`
    );
    return response.data;
};


// Create Company Detail
export const createCompanyDetail = async (data) => {
    const response = await api.post(
        `${SALES_URL}/company-detail`,
        data
    );

    return response.data;
};


// Update Company Detail
export const updateCompanyDetail = async (id,data) => {

    const response = await api.put(
        `${SALES_URL}/company-detail/${id}`,
        data
    );

    return response.data;
};


// Create Custom Field
export const createCustomField = async(data)=>{

    const response = await api.post(
        `${SALES_URL}/custom-field`,
        data
    );

    return response.data;
};


// Update Custom Field
export const updateCustomField = async(id,data)=>{

    const response = await api.put(
        `${SALES_URL}/custom-field/${id}`,
        data
    );

    return response.data;
};
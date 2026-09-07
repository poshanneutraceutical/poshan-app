import api from "./api";


const OPENING_URL = "/hr/openings";


// Create Job Opening
export const createOpening = async (data) => {

    const response = await api.post(
        OPENING_URL,
        data
    );

    return response.data;
};



// Get All Openings
export const getOpenings = async () => {

    const response = await api.get(
        OPENING_URL
    );

    return response.data;
};



// Get Opening By Id
export const getOpeningById = async (id) => {

    const response = await api.get(
        `${OPENING_URL}/${id}`
    );

    return response.data;
};



// Update Opening
export const updateOpening = async (id, data) => {

    const response = await api.put(
        `${OPENING_URL}/${id}`,
        data
    );

    return response.data;
};



// Delete Opening
export const deleteOpening = async (id) => {

    const response = await api.delete(
        `${OPENING_URL}/${id}`
    );

    return response.data;
};
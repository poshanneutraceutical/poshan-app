import api from "./api";

const USER_BASE_URL = "/admin/users";


const UserService = {

    // CREATE USER BY ADMIN
    createUser: async (userData) => {
        const response = await api.post(
            USER_BASE_URL,
            userData
        );
        return response.data;
    },


    // GET ALL USERS
    getAllUsers: async () => {
        const response = await api.get(
            USER_BASE_URL
        );
        return response.data;
    },


    // GET USER BY ID
    getUserById: async (id) => {
        const response = await api.get(
            `${USER_BASE_URL}/${id}`
        );
        return response.data;
    },


    // UPDATE USER
    updateUser: async (id, userData) => {
        const response = await api.put(
            `${USER_BASE_URL}/${id}`,
            userData
        );
        return response.data;
    },


    // DELETE USER
    deleteUser: async (id) => {
        const response = await api.delete(
            `${USER_BASE_URL}/${id}`
        );
        return response.data;
    }

};


export default UserService;
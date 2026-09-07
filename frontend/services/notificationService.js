import api from "./api";


const BASE_URL = "/notifications";


const notificationService = {


    // Get all notifications of user

    getUserNotifications: async (userId) => {

        const response = await api.get(
            `${BASE_URL}/user/${userId}`
        );

        return response.data;

    },





    // Get unread notification count

    getUnreadCount: async (userId) => {

        const response = await api.get(
            `${BASE_URL}/user/${userId}/count`
        );

        return response.data;

    },





    // Create notification

    createNotification: async (notification) => {

        const response = await api.post(
            BASE_URL,
            notification
        );

        return response.data;

    },





    // Mark notification as read

    markAsRead: async (id) => {

        const response = await api.put(
            `${BASE_URL}/${id}/read`
        );

        return response.data;

    },





    // Delete notification

    deleteNotification: async (id) => {

        const response = await api.delete(
            `${BASE_URL}/${id}`
        );

        return response.data;

    }


};


export default notificationService;
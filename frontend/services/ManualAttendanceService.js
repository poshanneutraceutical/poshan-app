import api from "./api";

const BASE_URL = "/hr/manual-attendance";

const ManualAttendanceService = {

    getPeople(date) {
        return api.get(
            `${BASE_URL}/people`,
            {
                params: {
                    date
                }
            }
        );
    },

    markAttendance(data) {
        return api.post(
            `${BASE_URL}/mark`,
            data
        );
    },

    updateAttendance(id, data) {
        return api.put(
            `${BASE_URL}/records/${id}`,
            data
        );
    },

    removeAttendance(personType, personId, date) {
        return api.delete(
            `${BASE_URL}/records`,
            {
                params: {
                    personType,
                    personId,
                    date
                }
            }
        );
    },

    getHistory(personType, personId) {
        return api.get(
            `${BASE_URL}/history/${personType}/${personId}`
        );
    },

    getWorkers() {
        return api.get(
            `${BASE_URL}/workers`
        );
    },

    createWorker(data) {
        return api.post(
            `${BASE_URL}/workers`,
            data
        );
    },

    updateWorker(id, data) {
        return api.put(
            `${BASE_URL}/workers/${id}`,
            data
        );
    }
};

export default ManualAttendanceService;

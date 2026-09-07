import api from "./api";

const BASE_URL = "/hr/attendance";

const AttendanceService = {


    // =========================================================
    // EMPLOYEE - ACCESS
    // =========================================================

    checkAttendanceAccess() {

        return api.get(
            `${BASE_URL}/access`
        );

    },


    // =========================================================
    // EMPLOYEE - CHECK IN
    // =========================================================

    checkIn() {

        return api.post(
            `${BASE_URL}/check-in`
        );

    },


    // =========================================================
    // EMPLOYEE - CHECK OUT
    // =========================================================

    checkOut() {

        return api.post(
            `${BASE_URL}/check-out`
        );

    },


    // =========================================================
    // EMPLOYEE - TODAY
    // =========================================================

    getTodayAttendance() {

        return api.get(
            `${BASE_URL}/today`
        );

    },


    // =========================================================
    // EMPLOYEE - OWN HISTORY
    // =========================================================

    getAttendanceHistory() {

        return api.get(
            `${BASE_URL}/history`
        );

    },


    // =========================================================
    // ADMIN - ALL ATTENDANCE
    // =========================================================

    getAllAttendance() {

        return api.get(
            `${BASE_URL}/all`
        );

    },


    // =========================================================
    // ADMIN - BY DATE
    // =========================================================

    getAttendanceByDate(
        date
    ) {

        return api.get(
            `${BASE_URL}/date`,
            {
                params: {
                    date
                }
            }
        );

    },


    // =========================================================
    // ADMIN - DATE RANGE
    // =========================================================

    getAttendanceBetweenDates(
        startDate,
        endDate
    ) {

        return api.get(
            `${BASE_URL}/date-range`,
            {
                params: {
                    startDate,
                    endDate
                }
            }
        );

    },


    // =========================================================
    // ADMIN - SELECTED EMPLOYEE + MONTH
    // =========================================================

    getEmployeeAttendanceByMonth(
        employeeId,
        year,
        month
    ) {

        return api.get(
            `${BASE_URL}/employee/${employeeId}/month`,
            {
                params: {
                    year,
                    month
                }
            }
        );

    }

};

export default AttendanceService;
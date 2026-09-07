import api from "./api";

const BASE_URL = "/hr/employees";

const EmployeeService = {

    /*
     ==========================================
     GET ALL EMPLOYEES
     ==========================================
     */

    getAllEmployees() {

        return api.get(BASE_URL);

    },


    /*
     ==========================================
     GET EMPLOYEE BY ID
     ==========================================
     */

    getEmployeeById(id) {

        return api.get(`${BASE_URL}/${id}`);

    },


    /*
     ==========================================
     CREATE EMPLOYEE
     ==========================================
     */

    createEmployee(employee, profileImage) {

        const formData = new FormData();

        /*
         ==========================================
         EMPLOYEE DATA
         ==========================================
         */

        formData.append(
            "employee",
            new Blob(
                [
                    JSON.stringify(employee)
                ],
                {
                    type: "application/json"
                }
            )
        );


        /*
         ==========================================
         PROFILE IMAGE
         ==========================================
         */

        if (profileImage) {

            formData.append(
                "profileImage",
                profileImage
            );

        }


        return api.post(
            BASE_URL,
            formData
        );

    },


    /*
     ==========================================
     UPDATE EMPLOYEE
     ==========================================
     */

    updateEmployee(id, employee, profileImage) {

        const formData = new FormData();

        /*
         ==========================================
         EMPLOYEE DATA
         ==========================================
         */

        formData.append(
            "employee",
            new Blob(
                [
                    JSON.stringify(employee)
                ],
                {
                    type: "application/json"
                }
            )
        );


        /*
         ==========================================
         PROFILE IMAGE
         ==========================================
         */

        if (profileImage) {

            formData.append(
                "profileImage",
                profileImage
            );

        }


        return api.put(
            `${BASE_URL}/${id}`,
            formData
        );

    },


    /*
     ==========================================
     DELETE EMPLOYEE
     ==========================================
     */

    deleteEmployee(id) {

        return api.delete(
            `${BASE_URL}/${id}`
        );

    }

};

export default EmployeeService;
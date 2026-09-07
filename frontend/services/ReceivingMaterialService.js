import api from "./api";

const BASE_URL = "/procurement/receiving-material";

const ReceivingMaterialService = {

    // ==========================
    // GET ALL
    // ==========================

    async getAllMaterials() {

        const response = await api.get(BASE_URL);

        return response.data;

    },

    // ==========================
    // GET BY ID
    // ==========================

    async getMaterialById(id) {

        const response = await api.get(

            `${BASE_URL}/${id}`

        );

        return response.data;

    },

    // ==========================
    // CREATE
    // ==========================

    async createMaterial(formData) {

        const response = await api.post(

            BASE_URL,

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            }

        );

        return response.data;

    },

    // ==========================
    // UPDATE
    // ==========================

    async updateMaterial(id, formData) {

        const response = await api.put(

            `${BASE_URL}/${id}`,

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            }

        );

        return response.data;

    },

    // ==========================
    // DELETE
    // ==========================

    async deleteMaterial(id) {

        const response = await api.delete(

            `${BASE_URL}/${id}`

        );

        return response.data;

    }

};

export default ReceivingMaterialService;
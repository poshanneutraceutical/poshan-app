import api from "./api";

const BASE_URL = "/box-dimensions";

const BoxDimensionService = {

    /*
     ==========================================
     GET ALL BOXES
     ==========================================
     */

    getAllBoxes: async () => {

        const response = await api.get(

            BASE_URL

        );

        return response.data;

    },

    /*
     ==========================================
     GET BOX BY ID
     ==========================================
     */

    getBoxById: async (id) => {

        const response = await api.get(

            `${BASE_URL}/${id}`

        );

        return response.data;

    },

    /*
     ==========================================
     CREATE BOX
     ==========================================
     */

    createBox: async (

            box,

            image

    ) => {

        const formData = new FormData();

        formData.append(

            "box",

            new Blob(

                [

                    JSON.stringify(box)

                ],

                {

                    type: "application/json"

                }

            )

        );

        if (image) {

            formData.append(

                "image",

                image

            );

        }

        const response = await api.post(

            BASE_URL,

            formData,

            {

                headers: {

                    "Content-Type":

                        "multipart/form-data"

                }

            }

        );

        return response.data;

    },

    /*
     ==========================================
     UPDATE BOX
     ==========================================
     */

    updateBox: async (

            id,

            box,

            image

    ) => {

        const formData = new FormData();

        formData.append(

            "box",

            new Blob(

                [

                    JSON.stringify(box)

                ],

                {

                    type: "application/json"

                }

            )

        );

        if (image) {

            formData.append(

                "image",

                image

            );

        }

        const response = await api.put(

            `${BASE_URL}/${id}`,

            formData,

            {

                headers: {

                    "Content-Type":

                        "multipart/form-data"

                }

            }

        );

        return response.data;

    },

    /*
     ==========================================
     DELETE BOX
     ==========================================
     */

    deleteBox: async (id) => {

        const response = await api.delete(

            `${BASE_URL}/${id}`

        );

        return response.data;

    }

};

export default BoxDimensionService;
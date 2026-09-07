import api from "./api";

const BASE_URL = "/products";

const ProductService = {

    getAllProducts() {
        return api.get(BASE_URL);
    },

    getProductById(id) {
        return api.get(`${BASE_URL}/${id}`);
    },

    createProduct(product) {
        return api.post(BASE_URL, product);
    },

    updateProduct(id, product) {
        return api.put(`${BASE_URL}/${id}`, product);
    },

    deleteProduct(id) {
        return api.delete(`${BASE_URL}/${id}`);
    },

    searchProducts(keyword) {
        return api.get(`${BASE_URL}/search`, {
            params: { keyword }
        });
    }

};

export default ProductService;
import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const productsApi = {
  getAllProducts: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/products`);
    return data;
  },

  getProductById: async (id) => {
    const { data } = await axios.get(`${API_BASE_URL}/products/${id}`);
    return data;
  },

  getCategories: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/products/categories`);
    return data;
  },

  getProductsByCategory: async (category) => {
    const { data } = await axios.get(`${API_BASE_URL}/products/category/${category}`);
    return data;
  },
};

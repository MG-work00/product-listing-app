import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};

export const getProduct = async (id) => {
  const { data } = await axios.get(`${API_URL}/products/${id}`);
  return data;
};

export const getLimitedProducts = async (limit = 5) => {
  const { data } = await axios.get(`${API_URL}/products?limit=${limit}`);
  return data;
};

export const getSortedProducts = async (sort = "desc") => {
  const { data } = await axios.get(`${API_URL}/products?sort=${sort}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await axios.get(`${API_URL}/products/categories`);
  return data;
};

export const getProductsByCategory = async (category) => {
  const { data } = await axios.get(`${API_URL}/products/category/${category}`);
  return data;
};

export const addProduct = async (productData) => {
  const { data } = await axios.post(`${API_URL}/products`, productData);
  return data;
};

export const updateProduct = async (id, productData) => {
  const { data } = await axios.put(`${API_URL}/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`${API_URL}/products/${id}`);
  return data;
};

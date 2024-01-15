import axios from 'axios';

export const getProducts = async () => await axios.get(`/api/products`);

export const getProduct = async (id) => await axios.get(`/api/products/${id}`);

export const deleteProduct = async (id) =>
  await axios.delete(`/api/products/${id}`);

export const editProduct = async (body) =>
  await axios.put(`/api/products`, body);

export const uploadFile = async (file, fileName) => {
  const formData = new FormData();

  formData.append('images', file);

  formData.append('names', fileName);
  await axios.post('/api/products/upload', formData);
};

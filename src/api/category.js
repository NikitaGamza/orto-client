import axios from 'axios';

export const getProductCategory = async () => await axios.get(`/api/category`);

export const deleteProductCategory = async (id) =>
  await axios.delete(`/api/category/${id}`);

export const editProductCategory = async (id, body) =>
  await axios.put(`/api/category/${id}`, body);

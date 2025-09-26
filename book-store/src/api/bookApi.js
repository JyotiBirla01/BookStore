// src/api/bookApi.js
import API from './axiosInstance';

export const getBooks = async (page = 1, limit = 10) => {
  const res = await API.get(`/book?page=${page}&limit=${limit}`);
  return res.data;
};

export const searchBooks = async (query, page = 1, limit = 10) => {
  const res = await API.get(
    `/book/search?q=${query}&page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getBooksByCategory = async (categoryId, page = 1, limit = 10) => {
  const res = await API.get(
    `/book/category/${categoryId}?page=${page}&limit=${limit}`
  );
  return res.data;
};

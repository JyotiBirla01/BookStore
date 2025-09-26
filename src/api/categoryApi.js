import API from './axiosInstance';

export const getCatgories = async () => {
  const res = await API.get('/category');
  return res.data;
};

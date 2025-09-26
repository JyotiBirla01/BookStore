import API from './axiosInstance';

export const addToWishList = async (bookId) => {
  const res = await API.post('/wishlist', bookId);
  return res.data;
};

export const getWishList = async () => {
  const res = await API.get('/wishlist');
  return res.data;
};

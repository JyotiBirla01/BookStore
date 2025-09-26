import API from './axiosInstance';

export const addToCart = async ({ bookId, quantity }) => {
  const res = await API.post('/cart', { bookId, quantity });
  return res.data;
};

export const getCarts=async()=>{
    const res= await API.get("/cart")
    return res.data;
}

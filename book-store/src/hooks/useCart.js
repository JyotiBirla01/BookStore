// src/hooks/useCart.js
import { useDispatch } from 'react-redux';
import { useAppSelector } from './reduxHooks';
import { toast } from 'react-toastify';
import { addToCartThunk, getCartThunk } from '../redux/slices/CartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useAppSelector((state) => state.cart);

  const handleAddToCart = async (bookId, quantity) => {
    const result = await dispatch(addToCartThunk({ bookId, quantity }));

    if (addToCartThunk.fulfilled.match(result)) {
      toast.success('Added to cart');
    } else {
      toast.error(result.payload || 'Failed to add to cart');
    }
  };

  return {
    addToCart: handleAddToCart,
    getCarts:()=>dispatch(getCartThunk()),
    loading,
    error,
    success,
  };
};

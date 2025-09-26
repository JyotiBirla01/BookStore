import { useDispatch } from 'react-redux';
import { useAppSelector } from './reduxHooks';
import {
  addToWishListThunk,
  getWishListThunk,
} from '../redux/slices/WishListSlice';
import { toast } from 'react-toastify';

export const useWishList = () => {
  const dispatch = useDispatch();
  const { books, error, loading, success, toggleStatus } = useAppSelector(
    (state) => state.wishList
  );

  const handleAddToWishList = async (bookId) => {
    const resultAction = await dispatch(addToWishListThunk(bookId));

    if (addToWishListThunk.fulfilled.match(resultAction)) {
      const message = resultAction.payload?.message;
      if (message.includes('Removed')) {
        toast.info('Removed from wishlist');
      } else {
        toast.success('Added to wishlist');
      }
      dispatch(getWishListThunk());
    } else if (addToWishListThunk.rejected.match(resultAction)) {
      toast.error(resultAction.payload || 'Failed to update wishlist');
    }
  };

  return {
    wishList: books,
    loading,
    error,
    success,
    toggleStatus,
    addToWishList: handleAddToWishList,
    getwishList: () => dispatch(getWishListThunk()),
  };
};

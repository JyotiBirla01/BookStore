import { useDispatch } from 'react-redux';
import { useAppSelector } from './reduxHooks';
import {
  clearCategoriesError,
  getCategoryThunk,
  resetCategoriesStatus,
} from '../redux/slices/categorySlice';

export const useCategories = () => {
  const dispatch = useDispatch();
  const { data, error, loading, success } = useAppSelector(
    (state) => state.categories
  );
  return {
    categories: data,
    error,
    loading,
    success,
    getCategories: () => dispatch(getCategoryThunk()),
    clearError: () => dispatch(clearCategoriesError()),
    resetStatus: () => dispatch(resetCategoriesStatus()),
  };
};

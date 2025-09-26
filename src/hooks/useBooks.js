// hooks/useBooks.js
import { useDispatch } from 'react-redux';
import { useAppSelector } from './reduxHooks';
import {
  clearBookError,
  getBooksThunk,
  resetBooksStatus,
  resetBooks,
  searchBooksThunk,
  getBooksByCategoryThunk,
} from '../redux/slices/bookSlice';
import { searchBooks } from '../api/bookApi';

export const useBooks = () => {
  const dispatch = useDispatch();
  const { data, error, loading, success, currentPage, totalPages } =
    useAppSelector((state) => state.books);

  const getBooks = (page = 1) => dispatch(getBooksThunk(page));
  const search = (query, page = 1) =>
    dispatch(searchBooksThunk({ query, page }));
  const getBooksByCategory = (categoryId, page = 1) =>
    dispatch(getBooksByCategoryThunk({ categoryId, page }));

  return {
    books: data,
    error,
    loading,
    success,
    currentPage,
    totalPages,
    getBooks,
    search,
    searchBooks,
    getBooksByCategory,
    clearError: () => dispatch(clearBookError()),
    resetStatus: () => dispatch(resetBooksStatus()),
    resetAll: () => dispatch(resetBooks()),
  };
};

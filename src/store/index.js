import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import profileReducer from '../redux/slices/profileSlice';
import categoryReducer from '../redux/slices/categorySlice';
import booksReducer from '../redux/slices/bookSlice';
import wishListReducer from '../redux/slices/WishListSlice';
import cartReducer from '../redux/slices/CartSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    categories: categoryReducer,
    books: booksReducer,
    wishList: wishListReducer,
    cart: cartReducer,
  },
});

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToWishList, getWishList } from '../../api/wishListApi';

const initialState = {
  loading: false,
  error: null,
  books: [],
  success: false,
};

export const addToWishListThunk = createAsyncThunk(
  'wishList',
  async (bookId, thunkAPI) => {
    try {
      const data = await addToWishList({ bookId });
      return { bookId, message: data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Faild to add to wishlist '
      );
    }
  }
);

export const getWishListThunk = createAsyncThunk(
  'getwishList',
  async (_, thunkAPI) => {
    try {
      const data = await getWishList();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Failed to fetch wishlists'
      );
    }
  }
);
const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    clearWishListError: (state) => {
      state.error = null;
    },
    resetWishListStatus: (state) => {
      state.toggleStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.toggleStatus = null;
      })
      .addCase(addToWishListThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { bookId, message } = action.payload;
        if (message.includes('Removed')) {
          state.books = state.books.filter((b) => b.id !== bookId);
        } else {
          // No book object returned in toggle, so just refetch wishlist later if needed
        }
        state.toggleStatus = message;
      })
      .addCase(addToWishListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWishListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.toggleStatus = null;
      })
      .addCase(getWishListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload || [];
      })
      .addCase(getWishListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishListError, resetWishListStatus } =
  wishListSlice.actions;
export default wishListSlice.reducer;

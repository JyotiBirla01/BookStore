import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCatgories } from '../../api/categoryApi';

const initialState = {
  data: null,
  error: null,
  loading: false,
  success: false,
};

export const getCategoryThunk = createAsyncThunk(
  'category/fetchCategory',
  async (_, thunkAPI) => {
    try {
      const data = await getCatgories();
      return data.books;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch categories'
      );
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategoriesError: (state) => {
      state.error = null;
    },
    resetCategoriesStatus: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.data = action.payload;
        else state.data = null;
      })
      .addCase(getCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearCategoriesError, resetCategoriesStatus } =
  categorySlice.actions;
export default categorySlice.reducer;

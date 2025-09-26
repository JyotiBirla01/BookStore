// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, getCarts } from '../../api/cartApi';

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  success: false,
};

export const addToCartThunk = createAsyncThunk(
  'cart/add',
  async ({ bookId, quantity }, thunkAPI) => {
    try {
      const data = await addToCart({ bookId, quantity });
      return { bookId, quantity, message: data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add to cart'
      );
    }
  }
);
export const getCartThunk = createAsyncThunk("cart/get",
  async (_, thunkAPI) => {
    try {
      const data = await getCarts()
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed  to get carts ")


    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
    resetCartStatus: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addToCartThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        // Optional: add to cartItems list here if required
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartThunk.pending,(state)=>{
        state.loading=true;
        state.error=null;
        state.success=false;
      })
      .addCase(getCartThunk.fulfilled,(state)=>{
        state.loading=false;
        state.error=null;
        state.success=true
      })
      .addCase(getCartThunk.rejected,(state)=>{
        state.loading=false;
        state.error=true;
        state.success=false;
      })
  },
});

export const { clearCartError, resetCartStatus } = cartSlice.actions;
export default cartSlice.reducer;

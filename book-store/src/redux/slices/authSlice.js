// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { sendOtp, verifyOtp } from '../../api/auth';

// // Create async thunks
// export const sendOtpAction = createAsyncThunk(
//   'auth/sendOtp',
//   async ({ mobile, role }, { rejectWithValue }) => {
//     try {
//       const response = await sendOtp(mobile, role);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const verifyOtpAction = createAsyncThunk(
//   'auth/verifyOtp',
//   async ({ mobile, otp }, { rejectWithValue }) => {
//     try {
//       const response = await verifyOtp(mobile, otp);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const initialState = {
//   loading: false,
//   error: null,
//   user: null,
//   token: null,
//   otpSent: false,
//   mobile:"",
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.otpSent = false;
//       state.mobile="";
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Send OTP
//     builder.addCase(sendOtpAction.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(sendOtpAction.fulfilled, (state) => {
//       state.loading = false;
//       state.otpSent = true;
//     });
//     builder.addCase(sendOtpAction.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     // Verify OTP
//     builder.addCase(verifyOtpAction.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(verifyOtpAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.otpSent = false;
//       state.isAuthenticated = true;
//     });
//     builder.addCase(verifyOtpAction.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
// });

// export const { logout, clearError,setMobile } = authSlice.actions;
// export default authSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendOtp, verifyOtp } from '../../api/authApi';
// import { sendOtp, verifyOtp } from '../../api/authApi';
// import { sendOtp, verifyOtp } from '../../api/authAPI';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  step: 'sendOtp',
  mobile: '',
};

export const sendOtpThunk = createAsyncThunk(
  'auth/sendOtp',
  async ({ mobile, role }, thunkAPI) => {
    try {
      const data = await sendOtp(mobile, role);
      return { mobile: data.mobile };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'OTP send failed'
      );
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async ({ mobile, otp }, thunkAPI) => {
    try {
      const data = await verifyOtp(mobile, otp);
      localStorage.setItem('token', data.token);
      return { user: data.user, token: data.token };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'OTP verification failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.step = 'sendOtp';
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.step = 'verifyOtp';
        state.mobile = action.payload.mobile;
      })
      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.step = 'loggedIn';
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile, createProfile, updateProfile } from '../../api/profileApi';

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

//  New Create Thunk
export const createProfileThunk = createAsyncThunk(
  'profile/createProfile',
  async (formData, thunkAPI) => {
    try {
      const data = await createProfile(formData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to create profile'
      );
    }
  }
);

// Existing thunks (fetch, update)
export const fetchProfileThunk = createAsyncThunk(
  'profile/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const data = await getProfile();
      return data;
    } catch (err) {
      if (err.response?.status === 404) {
        // No profile yet, return null silently
        return null;
      }
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  'profile/updateProfile',
  async (formData, thunkAPI) => {
    try {
      const data = await updateProfile(formData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    resetProfileStatus: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data = action.payload;
        } else {
          state.data = null; // Profile not created yet
        }
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Create
      .addCase(createProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(createProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileError, resetProfileStatus } = profileSlice.actions;
export default profileSlice.reducer;

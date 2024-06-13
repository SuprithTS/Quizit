import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios'

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

// Define loginUser thunk
export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  // Simulate an API call for login
  const response = await new Promise((resolve) =>
    setTimeout(() => resolve({ user: userData }), 1000)
  );
  return response.user;
});

//Define registerUser thunk
export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
  // Simulate an API call for registration
  const response = await new Promise((resolve) =>
    setTimeout(() => resolve({ user: userData }), 1000)
  );
  return response.user;
});

// export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
//   const response = await axios.post('/api/users/register', userData);
//   return response.data.user;
// });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

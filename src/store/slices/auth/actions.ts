import { API_ENDPOINTS } from "@/store/config/api";
import { createAsyncThunk, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const loginRequest = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.login}`, credentials);
      const { success, data } = response.data;
      if (success) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        return { user: data.user, token: data.token };
      }
      
      return rejectWithValue('Login was not successful');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const loginRequestHandler = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
        .addCase(loginRequest.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(loginRequest.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload as string;
            state.user = null;
            state.token = null;
        });
};

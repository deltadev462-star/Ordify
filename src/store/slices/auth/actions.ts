import { API_ENDPOINTS } from "@/store/config/api";
import type { AuthState } from "@/types/auth.types";
import { createAsyncThunk, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import axios from "axios";



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
        console.log({error})
        return rejectWithValue(error.response?.data?.error || 'Login failed');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const registerRequest = createAsyncThunk(
  'auth/register',
  async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    storeName?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.register}`, userData);
      const { success, data } = response.data;
      
      if (success) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        return {
          user: data.user,
          token: data.token,
          store: data.store
        };
      }
      
      return rejectWithValue('Registration was not successful');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log({error});
        const errorMessage = error.response?.data?.error ||
                           error.response?.data?.message ||
                           'Registration failed';
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.getProfile}`);
      const { success, data } = response.data;
      
      if (success) {
        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        return { user: data.user };
      }
      
      return rejectWithValue('Failed to fetch user profile');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log({error});
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch profile');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_ENDPOINTS.updateProfile}`, profileData);
      const { success, data } = response.data;
      
      if (success) {
        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        return { user: data.user };
      }
      
      return rejectWithValue('Failed to update profile');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log({error});
        return rejectWithValue(error.response?.data?.error || 'Failed to update profile');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_ENDPOINTS.updatePassword}`, passwordData);
      const { success } = response.data;
      
      if (success) {
        return { message: 'Password updated successfully' };
      }
      
      return rejectWithValue('Failed to update password');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log({error});
        return rejectWithValue(error.response?.data?.error || 'Failed to update password');
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

export const registerRequestHandler = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
        .addCase(registerRequest.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(registerRequest.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload as string;
            state.user = null;
            state.token = null;
        });
};

export const updateProfileHandler = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.error = null;
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
};

export const updatePasswordHandler = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
        .addCase(updatePassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updatePassword.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
};

export const getUserProfileHandler = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
        .addCase(getUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.error = null;
        })
        .addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
};

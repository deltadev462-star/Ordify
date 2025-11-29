import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginRequestHandler } from './actions';
import type { AuthState } from '@/types/auth.types';




const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const user = typeof window !== 'undefined' && localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : null;

const initialState: AuthState = {
  user,
  token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

// Set default authorization header if token exists
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    },
    setAuthFromToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
    },
  },
  extraReducers: (builder) => {
   loginRequestHandler(builder)
  },
});

export const { logout, setAuthFromToken } = authSlice.actions;
export default authSlice.reducer;
// src/features/slices/authSlice.ts
import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../api/UserApi';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean | null;
}
const userData = localStorage.getItem("user");
const tokenData = localStorage.getItem("token");
const expiry = localStorage.getItem("tokenExpiry");

const isTokenValid = expiry &&(new Date().getTime() < parseInt(expiry));


// const initialState: AuthState = {
//   user: null,
//   token: null,
//   isAuthenticated: isTokenValid,
// };

const initialState: AuthState = {
  user: userData && isTokenValid ? JSON.parse(userData) : null,
  token: tokenData && isTokenValid ? tokenData : null,
  isAuthenticated: !!(tokenData && isTokenValid),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: {
      _id:string ; username:string ; totalPoints?:number ; email:string ; password?:string ;
    }; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day in ms

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tokenExpiry", expiryTime.toString()); // ⏱ save expiry
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry"); // 🧹 remove expiry
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
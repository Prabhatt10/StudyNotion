import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpData: null,
  loading: false,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignUpData(state, action) {
      state.signUpData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      // also persist it to localStorage
      localStorage.setItem("token", action.payload);
    },
  },
});

export const { setSignUpData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;

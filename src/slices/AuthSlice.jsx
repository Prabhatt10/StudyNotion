import { createSlice } from "@reduxjs/toolkit";
import SignUp from "../pages/SignUp";

const initialState = {
  signUpData : null,
  loading : false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignUpData(state,value){
      state.signUpData = value.payload
    },
    setLoading(state,value){
      state.loading = value.payload
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setSignUpData,setLoading,setToken } = authSlice.actions;
export default authSlice.reducer;

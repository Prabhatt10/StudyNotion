import { combineReducers } from "@reduxjs/toolkit";
import authSlice from '../slices/AuthSlice'
import profileSlice from '../slices/ProfileSlice'
import cartSlice from '../slices/CartSlice' 

const rootReducer = combineReducers({
    auth : authSlice,
    profile : profileSlice,
    cart : cartSlice,
})

export default rootReducer
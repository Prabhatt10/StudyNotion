import { combineReducers } from "@reduxjs/toolkit";
import authSlice from '../slices/AuthSlice'
import profileSlice from '../slices/ProfileSlice'
import cartSlice from '../slices/CartSlice' 
import courseSlice from '../slices/CourseSlice'

const rootReducer = combineReducers({
    auth : authSlice,
    profile : profileSlice,
    cart : cartSlice,
    course: courseSlice
})

export default rootReducer
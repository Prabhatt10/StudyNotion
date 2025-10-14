import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {login} from '../../../services/operations/authAPI'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const {email,password} = formData ;

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const clickHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(email,password,navigate));
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full max-w-md mx-auto gap-4 mt-6 px-4 sm:px-0"
    >
      {/* Email */}
      <label className="w-full">
        <p className="text-[#DBDDEA] text-sm mb-1">
          Email Address <sup className="text-pink-400">*</sup>
        </p>
        <input
          required
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email Id"
          name="email"
          className="bg-[#161D29] rounded-md text-[#DBDDEA] w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </label>

      {/* Password */}
      <label className="w-full relative">
        <p className="text-[#DBDDEA] text-sm mb-1">
          Password <sup className="text-pink-400">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="bg-[#161D29] rounded-md text-[#DBDDEA] w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <span
          onClick={clickHandler}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AFB2BF] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEye size={20} />
          ) : (
            <AiOutlineEyeInvisible size={20} />
          )}
        </span>
      </label>

      {/* Forgot Password */}
      <div className="w-full text-right">
        <Link to="/resetPassword">
          <p className="text-sm text-yellow-500 hover:underline">Forgot Password?</p>
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-yellow-500 rounded-md w-full py-3 mt-2 text-black font-medium hover:bg-yellow-400 transition-colors"
      >
        Sign In
      </button>
    </form>
  );
}

export default Login;

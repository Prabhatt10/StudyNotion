import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from '../services/operations/authAPI'

function UpdatePassword() {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }))
  }

  function submitHandler(event) {
    event.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-[500px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[508px] bg-transparent p-6 sm:p-8 flex flex-col items-start justify-center">
          
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F1F2FF] mb-2 text-center sm:text-left w-full">
            Choose New Password
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg leading-relaxed text-[#AFB2BF] mb-6 text-center sm:text-left">
            Almost done. Enter your new password and you’re all set.
          </p>

          {/* Form */}
          <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
            
            {/* Password Field */}
            <label className="relative w-full">
              <p className="mb-1 text-sm sm:text-[0.875rem] text-[#F1F2FF]">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={changeHandler}
                placeholder="Enter Password"
                className="w-full p-3 sm:p-4 pr-10 rounded-md bg-[#161D29] text-[#999DAA] outline-none text-sm sm:text-base"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[60%] -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={22} fill="#AFB2BF" />
                )}
              </span>
            </label>

            {/* Confirm Password Field */}
            <label className="relative w-full">
              <p className="mb-1 text-sm sm:text-[0.875rem] text-[#F1F2FF]">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={changeHandler}
                placeholder="Confirm Password"
                className="w-full p-3 sm:p-4 pr-10 rounded-md bg-[#161D29] text-[#999DAA] outline-none text-sm sm:text-base"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[60%] -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={22} fill="#AFB2BF" />
                )}
              </span>
            </label>

            {/* Button */}
            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-yellow-500 py-3 sm:py-4 px-4 font-medium text-[#000814] text-sm sm:text-base hover:opacity-90 transition-all"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 flex items-center justify-center sm:justify-start gap-2 text-[#AFB2BF] text-sm sm:text-base">
            <BiArrowBack /> 
            <Link to="/login" className="hover:underline">Back to Login</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword

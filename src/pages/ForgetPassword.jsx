import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowBack } from "react-icons/bi"

import {getPasswordResetToken} from '../services/operations/authAPI'
import { Link } from 'react-router'

function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  function submitHandler(event) {
    event.preventDefault()
    dispatch(getPasswordResetToken(email,setEmailSent))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375] text-[#F1F2FF]">
            {!emailSent ? "Reset Your Password" : "Check Email"}
          </h1>

          <div className="my-4 text-[1.125rem] leading-[1.625] text-[#AFB2BF]">
            {!emailSent ? (
              <p>
                Have no fear. We'll email you instructions to reset your
                password. If you don’t have access to your email we can try
                account recovery.
              </p>
            ) : (
              <p>We have sent the reset email to {email}.</p>
            )}
          </div>

          <form onSubmit={submitHandler} >
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375] text-[#F1F2FF]">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email Address"
                  onChange={(event) => setEmail(event.target.value)}
                  className="form-style w-full bg-[#2C333F] text-[#F1F2FF] px-4 py-2.5 rounded-md mt-2" 
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-[#000814]"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          <Link to={'/login'} className="mt-6 flex items-center justify-between">
            <p className="flex items-center gap-x-2 text-[#F1F2FF] cursor-pointer">
              <BiArrowBack /> Back to login
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ForgetPassword

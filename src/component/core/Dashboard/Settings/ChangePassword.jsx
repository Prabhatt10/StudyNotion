import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../../../../services/operations/SettingAPI'
import IconButton from '../../../common/IconButton'

function ChangePassword() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitHandler = (data) => {
    dispatch(updatePassword(token, data))
  }

  return (
    <div className="w-full px-4 md:px-8">

      <form onSubmit={handleSubmit(submitHandler)} className="w-full">
        <div className="my-10 flex flex-col gap-y-6 rounded-md border border-[#2C333F] bg-[#161D29] p-6 md:p-10">

          <h1 className="text-lg font-semibold text-[#F1F2FF]">
            Change Password
          </h1>

          {/* Responsive container */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">

            {/* Old Password */}
            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="oldPassword" className="text-[#DBDDEA]">
                Current Password
              </label>

              <input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter Current Password"
                className="w-full bg-[#585D69] px-4 py-2 rounded-md text-[#000814]"
                {...register("oldPassword", { required: true })}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-4 top-[45px] cursor-pointer z-20"
              >
                {showOldPassword ?
                  <AiOutlineEyeInvisible className="text-[#e4dcb9]" /> :
                  <AiOutlineEye className="text-[#e4dcb9]" />
                }
              </span>

              {errors.oldPassword && (
                <span className="text-[12px] text-[#E7C009]">
                  Please enter your Current Password
                </span>
              )}
            </div>

            {/* New Password */}
            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="newPassword" className="text-[#DBDDEA]">
                New Password
              </label>

              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter New Password"
                className="w-full bg-[#585D69] px-4 py-2 rounded-md text-[#000814]"
                {...register("newPassword", { required: true })}
              />

              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-4 top-[45px] cursor-pointer z-20"
              >
                {showNewPassword ?
                  <AiOutlineEyeInvisible className="text-[#e4dcb9]" /> :
                  <AiOutlineEye className="text-[#e4dcb9]" />
                }
              </span>

              {errors.newPassword && (
                <span className="text-[12px] text-[#E7C009]">
                  Please enter your New Password
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 md:gap-6 pb-6">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="rounded-md bg-[#2C333F] py-2 px-5 font-semibold text-[#C5C7D4]"
          >
            Cancel
          </button>

          <IconButton type="submit" text="Save" />
        </div>

      </form>

    </div>
  )
}

export default ChangePassword

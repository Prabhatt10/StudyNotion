import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconButton from "../../../common/IconButton"
import { updateProfile } from "../../../../services/operations/SettingAPI"
import { useForm } from "react-hook-form"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

function ChangeProfileInformation() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const SubmitHandler = (data) => {
    dispatch(updateProfile(token, data))
  }

  return (
    <div className="w-full px-4 md:px-8">
      <form onSubmit={handleSubmit(SubmitHandler)} className="w-full">

        <div className="my-10 flex flex-col gap-y-6 rounded-md border border-[#2C333F] bg-[#161D29] p-6 md:p-10">

          <h1 className="text-lg font-semibold text-[#F1F2FF]">
            Profile Information
          </h1>

          {/* ---------- First / Last Name ---------- */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="firstName" className="text-[#DBDDEA]">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter First Name"
                className="bg-[#585D69] px-4 py-2 rounded-md text-[#000814]"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="text-[12px] text-[#E7C009]">Please enter your First Name</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="lastName" className="text-[#DBDDEA]">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter Last Name"
                className="bg-[#585D69] px-4 py-2 rounded-md text-[#000814]"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="text-[12px] text-[#E7C009]">Please enter your Last Name</span>
              )}
            </div>
          </div>

          {/* ---------- DOB / Gender ---------- */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="dateOfBirth" className="text-[#DBDDEA]">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="bg-[#585D69] px-4 py-2 rounded-md text-[#000814]"
                {...register("dateOfBirth", {
                  required: "Enter Date Of Birth",
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Cannot be a future date",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="text-[12px] text-[#E7C009]">{errors.dateOfBirth.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="gender" className="text-[#DBDDEA]">
                Gender
              </label>
              <select
                id="gender"
                className="bg-[#585D69] px-4 py-2 rounded-md text-[#000814]"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((g, i) => (
                  <option key={i} value={g}>{g}</option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-[12px] text-[#E7C009]">Please select a gender</span>
              )}
            </div>
          </div>

          {/* ---------- Contact / About ---------- */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="contactNumber" className="text-[#DBDDEA]">
                Contact Number
              </label>
              <input
                id="contactNumber"
                type="text"
                placeholder="Enter Contact Number"
                className="bg-[#585D69] px-4 py-2 rounded-md text-[#000814]"
                {...register("contactNumber", {
                  required: "Contact Number is required",
                  maxLength: { value: 12, message: "Cannot exceed 12 digits" },
                  minLength: { value: 10, message: "Should be at least 10 digits" },
                  pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="text-[12px] text-[#E7C009]">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="about" className="text-[#DBDDEA]">
                About
              </label>
              <input
                id="about"
                type="text"
                placeholder="Tell us about yourself"
                className="bg-[#585D69] px-4 py-2 rounded-md text-[#000814]"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="text-[12px] text-[#E7C009]">Please enter something</span>
              )}
            </div>
          </div>

        </div>

        {/* ---------- Buttons ---------- */}
        <div className="flex justify-end gap-4 md:gap-6 pb-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard/settings")}
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

export default ChangeProfileInformation

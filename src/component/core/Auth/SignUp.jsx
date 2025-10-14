import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { sendOTP } from "../../../services/operations/authAPI";
import { setSignUpData } from "../../../slices/AuthSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";

import Tab from "../../common/Tab";



function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const {firstName,lastName,email,password,confirmPassword} = formData

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    }
    dispatch(setSignUpData(signupData))
    dispatch(sendOTP(formData.email,navigate))

    setFormData({
      firstName : "",
      lastName:"",
      email :"",
      password : "",
      confirmPassword : "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  };

  const tabData = [
    {
      id :  1,
      tabName : "Student",
      type : ACCOUNT_TYPE.STUDENT,
    },
    {
      id : 2,
      tabName : "Instructor",
      type : ACCOUNT_TYPE.INSTRUCTOR
    }
  ]

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 sm:px-0">
      {/* Account Type Toggle */}
      {/* <div className="flex bg-[#161D29] p-1 gap-1 my-6 rounded-full max-w-max">
        {["student", "instructor"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setAccountType(type)}
            className={`py-2 px-5 rounded-full transition-all duration-200 ${
              accountType === type
                ? "bg-[#000814] text-[#DBDDEA]"
                : "bg-transparent text-[#999DAA]"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div> */}

      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* SignUp Form */}
      <form onSubmit={submitHandler} className="flex flex-col gap-4 w-full gap-y-4 ">
        {/* Name Fields */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="w-full">
            <p className="text-[#DBDDEA] text-sm mb-1">
              First Name <sup className="text-pink-400">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={changeHandler}
              className="bg-[#161D29] rounded-md text-[#DBDDEA] w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </label>
          <label className="w-full">
            <p className="text-[#DBDDEA] text-sm mb-1">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={changeHandler}
              className="bg-[#161D29] rounded-md text-[#DBDDEA] w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </label>
        </div>

        {/* Email */}
        <label className="w-full">
          <p className="text-[#DBDDEA] text-sm mb-1">
            Email Address <sup className="text-pink-400">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={changeHandler}
            className="bg-[#161D29] rounded-md text-[#DBDDEA] w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </label>

        {/* Password Fields */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="w-full relative">
            <p className="text-[#DBDDEA] text-sm mb-1">
              Create Password <sup className="text-pink-400">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={changeHandler}
              className="bg-[#161D29] rounded-md text-[#DBDDEA] w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AFB2BF] cursor-pointer"
            >
              {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[#DBDDEA] text-sm mb-1">
              Confirm Password <sup className="text-pink-400">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={changeHandler}
              className="bg-[#161D29] rounded-md text-[#DBDDEA] w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AFB2BF] cursor-pointer"
            >
              {showConfirmPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-500 rounded-md w-full py-3 mt-2 text-black font-medium hover:bg-yellow-400 transition-colors"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;


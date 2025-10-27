import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { signUp, sendOTP } from "../services/operations/authAPI";
import { useNavigate, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import toast from "react-hot-toast";

function VerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, signUpData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");

  // ✅ Retrieve email (either from redux or localStorage)
  const email = signUpData?.email || localStorage.getItem("signupData");

  // ✅ Redirect to signup if user somehow reaches here without data
  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
  },[]);

  // ✅ Submit OTP handler
  const submitHandler = (event) => {
    event.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword } = signUpData;
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

  // ✅ Resend OTP handler
  const resendOtpHandler = () => {
    if (!email) {
      toast.error("Email not found. Please sign up again.");
      navigate("/signup");
      return;
    }
    dispatch(sendOTP(email));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div><div className="spinner"></div></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[#F1F2FF] font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-[#AFB2BF]">
            A verification code has been sent to <b>{email}</b>.
          </p>

          {/* OTP input form */}
          <form onSubmit={submitHandler}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-[#161D29] rounded-[0.5rem]
                             text-[#F1F2FF] aspect-square text-center focus:border-0
                             focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 
                         font-medium text-[#000814] flex items-center justify-center gap-x-3"
            >
              <BiArrowBack /> Verify Email
            </button>
          </form>

          {/* Back and resend controls */}
          <div className="flex flex-row items-center justify-between mt-[15px]">
            <Link to="/signup" className="mt-6 flex items-center justify-between">
              <p className="text-[#F1F2FF] flex items-center gap-x-2">
                <BiArrowBack />
                Back to Signup
              </p>
            </Link>

            <button
              onClick={resendOtpHandler}
              className="flex items-center text-blue-100 gap-x-2"
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;

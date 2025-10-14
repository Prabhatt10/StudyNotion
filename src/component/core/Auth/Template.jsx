import React from "react";
import SignUp from "../../../component/core/Auth/SignUp";
import Login from "../../../component/core/Auth/Login";
import Frame from "../../../assets/Images/frame.png";
import { FcGoogle } from "react-icons/fc";

function Template({ title, description1, description2, image, formType, setIsLoggedIn }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-10">
      
      {/* Form Section */}
      <div className="w-full lg:w-[450px]">
        <h1 className="text-white font-semibold text-2xl sm:text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>
        <p className="leading-[1.625rem] mt-4">
          <span className="text-white">{description1}</span> <br />
          <span className="text-blue-300">{description2}</span>
        </p>

        {/* Form */}
        {formType === "SignUp" ? (
          <SignUp setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}

        {/* OR Divider */}
        <div className="flex items-center my-4 gap-2">
          <div className="flex-1 h-[1px] bg-[#2C333F]"></div>
          <p className="text-[#2C333F] font-medium leading-[1.375rem]">OR</p>
          <div className="flex-1 h-[1px] bg-[#2C333F]"></div>
        </div>

        {/* Google Button */}
        <button className="w-full flex justify-center items-center rounded-md font-medium text-white border border-[#2C333F] px-4 py-2 gap-2 mt-6 cursor-pointer hover:bg-[#1E2433] transition">
          <FcGoogle />
          <p>Sign Up with Google</p>
        </button>
      </div>

      {/* Image Section */}
      <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 mt-20">
        <img
          src={Frame}
          width={558}
          height={504}
          loading="lazy"
        />
        {image && (
          <img
            src={image}
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-4 right-4 z-10"
          />
        )}
      </div>
    </div>
  );
}

export default Template;

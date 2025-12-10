import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json';

function ContactUsForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  function submitContactForm(data) {
    console.log("Form submitted:", data);
    // You can later send data to backend here
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNumber: "",
        countryCode: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* First and Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstName" className="label-style">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            className="form-style bg-[#161D29] px-3 py-2 rounded-md"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your first name
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastName" className="label-style">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter Last Name"
            className="form-style bg-[#161D29] px-3 py-2 rounded-md"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your last name
            </span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="label-style">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="form-style bg-[#161D29] px-3 py-2 rounded-md"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your email address
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber" className="label-style">
          Phone Number
        </label>
        <div className="flex gap-5">
          <div className="flex w-[200px] flex-col gap-2 bg-[#161D29] px-3 py-2 rounded-md">
            <select
              type="text"
              id="dropDown"
              name='dropDown'
              {...register("countryCode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code} className="text-[#424854]">
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              id="phoneNumber"
              placeholder="01234 56789"
              className="form-style bg-[#161D29] px-3 py-2 rounded-md"
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "Please enter your phone number",
                },
                maxLength: { value: 12, message: "Invalid phone number" },
                minLength: { value: 10, message: "Invalid phone number" },
              })}
            />
          </div>
        </div>

        {errors.phoneNumber && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label-style">
          Message
        </label>
        <textarea
          id="message"
          cols="30"
          rows="7"
          placeholder="Type your message here..."
          className="form-style resize-none px-3 py-2 rounded-md bg-[#161D29]"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your message
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
          !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"
        } disabled:bg-[#585D69] sm:text-[16px]`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactUsForm;

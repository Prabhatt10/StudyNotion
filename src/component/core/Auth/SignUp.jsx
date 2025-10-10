import { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function SignUp() {
const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [accountType,setAccountType] = useState("student");

  function changeHandler(event) {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function clickHandler1() {
    setShowPassword(prev => !prev);
  }

  function clickHandler2() {
    setShowConfirmPassword(prev => !prev);
  }

  function submitHandler(event) {
    event.preventDefault();

    if(formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoggedIn(true);
    toast.success("Account Created");
  }

  return (
    <div className='flex flex-col w-full ' >
      <div className="flex bg-[#161D29] p-1 gap-z-1 my-6 rounded-full max-w-max">
        <button onClick={ () => setAccountType("student")} type="button" 
        className={`${accountType === "student" ?
        "bg-[#000814] text-[#DBDDEA]" :
        "bg-transparent text-[#999DAA]"
        } py-2 px-5 rounded-full transition-all duration-200`}
        >
          Student
        </button>
        <button onClick={ () => setAccountType("instructor")} type="button" 
        className={`${accountType === "instructor" ?
        "bg-[#000814] text-[#DBDDEA]" :
        "bg-transparent text-[#999DAA]"
        } py-2 px-5 rounded-full transition-all duration-200`}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="flex w-full gap-x-4 mt-4">
          <label className='w-full'>
            <p className='text-[#DBDDEA] text-[0.875rem] mb-1 leading-[1.375rem] '>First Name<sup className='text-pink-200' >*</sup></p>
            <input
              required
              type='text'
              name='firstName'
              onChange={changeHandler}
              placeholder='Enter First Name'
              value={formData.firstName}
              className='bg-[#161D29] rounded-[0.5rem] text-[#DBDDEA] w-full p-[12px] '
            />
          </label>

          <label className='w-full'>
            <p className='text-[#DBDDEA] text-[0.875rem] mb-1 leading-[1.375rem] '>Last Name<sup className='text-pink-200' >*</sup></p>
            <input
              required
              type='text'
              name='lastName'
              onChange={changeHandler}
              placeholder='Enter Last Name'
              value={formData.lastName}
              className='bg-[#161D29] rounded-[0.5rem] text-[#DBDDEA] w-full p-[12px] '
            />
          </label>
        </div>

        <label>
          <p className='text-[#DBDDEA] text-[0.875rem] mt-2 mb-2 leading-[1.375rem] '>Email Address<sup className='text-pink-200'>*</sup></p>
          <input
            required
            type='email'
            name='email'
            onChange={changeHandler}
            placeholder='Email address'
            value={formData.email}
            className='bg-[#161D29] rounded-[0.5rem] text-[#DBDDEA] w-full p-[12px]'
          />
        </label>

        <div className="flex gap-4">
          <label className='w-full relative mt-2'>
            <p className='text-[#DBDDEA] text-[0.875rem] mb-1 leading-[1.375rem] '>Create Password<sup className='text-pink-200'>*</sup></p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name='password'
              onChange={changeHandler}
              placeholder='Enter Password'
              value={formData.password}
              className='bg-[#161D29] rounded-[0.5rem] text-[#DBDDEA] w-full p-[12px]'
            />
            <span onClick={clickHandler1} className='text-white absolute right-3 top-[42px]'>
              {showPassword ? <AiOutlineEye className='font-24 text-[#AFB2BF] cursor-pointer ' /> : <AiOutlineEyeInvisible className='font-24 text-[#AFB2BF] cursor-pointer' />}
            </span>
          </label>

          <label className='w-full relative mt-2'>
            <p className='text-[#DBDDEA] text-[0.875rem] mb-1 leading-[1.375rem] '>Confirm Password<sup className='text-pink-200'>*</sup></p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name='confirmPassword'
              onChange={changeHandler}
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              className='bg-[#161D29] rounded-[0.5rem] text-[#DBDDEA] w-full p-[12px]'
            />
            <span onClick={clickHandler2} className='text-white absolute right-3 top-[42px] '>
              {showConfirmPassword ? <AiOutlineEye className='font-24 text-[#AFB2BF] cursor-pointer ' /> : <AiOutlineEyeInvisible className='font-24 text-[#AFB2BF] cursor-pointer' />}
            </span>
          </label>
        </div>

        <button type="submit" className='bg-yellow-500 rounded-[8px] w-full px-[12px] py-[8px] mt-4 text-black cursor-pointer font-medium'>Create Account</button>
      </form>
    </div>
  )
}

export default SignUp
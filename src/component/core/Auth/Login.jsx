import React, { useState } from 'react'
import { CgPassword } from 'react-icons/cg'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Login({setIsLoggedIn}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "" ,
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    function clickHandler() {
        setShowPassword(prev => !prev);
    }

    function submitHandler(event) {
        event.preventDefault();
        setIsLoggedIn(true);
        toast.success("Logged In");
        navigate("/dashboard")
    }

  return (
    <form onSubmit={submitHandler} 
        className='flex flex-col w-full gap-y mt-6'
    >
    <label className='w-full' >
        <p className='text-[#DBDDEA] text-[0.875rem] mb-1 leading-[1.375rem] '>Email Address <sup className='text-pink-200' >*</sup></p>
        <input 
            required
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter Email Id"
            name="email"
            className='bg-[#161D29] rounded-[0.5rem] text-[#DBDDEA] w-full p-[12px] '
                />
            </label>

        <label className='w-full relative mt-2' >
            <p className='text-[#DBDDEA] text-[0.875rem] mb-1 leading-[1.375rem]'>Password <sup>*</sup></p>
            <input 
                required
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
                className='bg-[#161D29] rounded-[0.5rem] text-[#DBDDEA] w-full p-[12px] '
                />
                <span onClick={clickHandler} className='text-white absolute right-3 top-[42px] '>
                    {showPassword ? <AiOutlineEye className='font-24 text-[#AFB2BF] cursor-pointer ' /> : <AiOutlineEyeInvisible className='font-24 text-[#AFB2BF] cursor-pointer' />}
                </span>

                <Link to="/">
                    <p>Forgot Password</p>
                </Link>
            </label>
        <button type="submit" className='bg-yellow-500 rounded-[8px] w-full px-[12px] py-[8px] mt-4 text-black cursor-pointer font-medium'>
            Sign In
        </button>
    </form>
  )
}

export default Login
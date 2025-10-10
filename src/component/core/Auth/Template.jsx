import React from 'react'
import SignUp from '../../../component/core/Auth/SignUp'
import Login from '../../../component/core/Auth/Login'
import Frame from '../../../assets/Images/frame.png'
import { FcGoogle } from 'react-icons/fc'

function Template({title,description1,description2,image,formType, setIsLoggedIn}) {
  return (
<div className='flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-10 gap-y-0 ' >
        <div className='w-11/12 max-w-[450px]' >
            <h1 className='text-white font-semibold text-[1.875rem] leading-[2.375rem] ' >{title}</h1>
            <p className='leading-[1.625rem] mt-4 ' >
                <span className='text-white'> {description1} </span> <br/>
                <span className='text-blue-300'> {description2} </span>
            </p>
            {
                formType === "SignUp" ? 
                <SignUp setIsLoggedIn={setIsLoggedIn} /> :
                <Login setIsLoggedIn={setIsLoggedIn} />  
            }
            <div className='flex w-full items-center my-4 gap-x-2' >
                <div className= ' w-full h-[1px] bg-[#2C333F] ' ></div>
                <p className='text-[#2C333F] font-medium leading-[1.375rem] '>OR</p>
                <div className= ' w-full h-[1px] bg-[#2C333F]' ></div>
            </div>
            <button className='w-full flex justify-center items-center rounded-[8px] font-mediun text-white border border-[#2C333F] px-[12px] py-[8px] gap-x-2 mt-6 cursor-pointer'>
                <FcGoogle/>
                <p>
                    
                    Sign Up with Google
                </p>
            </button>
        </div>
        <div className='relative w-11/12 max-w-[450px]' >
            <img src={Frame} width={558} height={504} loading='lazy'

            />
            <img src={image} width={558} height={504} loading='lazy'
                className='absolute -top-4 right-4'
            />
        </div>
    </div>
  )
}

export default Template
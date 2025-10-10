import React from 'react'
import Template from '../component/core/Auth/Template'
import loginimg from '../assets/Images/login.webp'

function LoginPage({setIsLoggedIn}) {
  return (
    <div>
        <Template 
          title ="Welcome Back"
          description1 = "Build Skils for today, tomorrow and beyond"
          description2 = "Education to future-proof your career"
          image={loginimg}
          formType="Login"
          setIsLoggedIn={setIsLoggedIn}
        />
    </div>
  )
}

export default LoginPage
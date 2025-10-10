import React from 'react'
import InstructorImage from '../../../assets/Images/instructor.png'
import HighLightText from '../HomePage/HighLightText'
import CTAbutton from './CTAbutton'
import { FaArrowRight } from 'react-icons/fa'

function BecomeInstructorSection() {
  return (
    <div className="mt-10 px-6 md:px-10 lg:px-20">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
        
        {/* Left Section - Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img 
            src={InstructorImage} 
            alt="Instructor" 
            className="max-w-[80%] md:max-w-[70%] lg:max-w-full shadow-white rounded-2xl"
          />
        </div>

        {/* Right Section - Text */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-10 justify-center text-center lg:text-left">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
            <p className="text-[#F9F9F9]">Become an</p>
            <HighLightText text={"Instructor"} />
          </div>

          <p className="text-[#838894] font-medium text-[15px] sm:text-[16px] max-w-[90%] mx-auto lg:mx-0">
            Instructors from around the world teach millions of students on StudyNotion.
            We provide the tools and skills to teach what you love.
          </p>

          <div className="flex justify-center lg:justify-start">
            <CTAbutton active={true} LinkTo={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAbutton>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BecomeInstructorSection

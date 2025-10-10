import React from 'react'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'

import TimeLineImage from '../../../assets/Images/TimeLineImage.png'

const TimeLine = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company"
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority"
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills"
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution"
  }
]

function TimeLineSection() {

  return (
    <div className="px-4 md:px-10 lg:px-20 mt-24">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">

        {/* Timeline List */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          {TimeLine.map((item, index) => (
            <div className="flex flex-row gap-4 sm:gap-6 items-start" key={index}>
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <img src={item.Logo} alt={item.heading} className="w-10 h-10" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[#161D29] font-semibold text-lg sm:text-[18px]">{item.heading}</h4>
                <p className="text-sm sm:text-base">{item.Description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image with Overlay */}
        <div className="relative w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <img 
            src={TimeLineImage} 
            alt="TimeLineImage" 
            className="object-contain w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />

          {/* Overlay Stats */}
          <div className="absolute bg-[#014A32] flex flex-col sm:flex-row text-white font-semibold uppercase py-3 sm:py-5 rounded-lg left-1/2 top-[+100%] transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
            
            <div className="flex flex-row gap-3 sm:gap-5 items-center border-b sm:border-b-0 sm:border-r border-[#06D6A0] px-4 sm:px-7 py-2 sm:py-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">10</h1>
              <p className="text-[#05BF8E] text-xs sm:text-sm md:text-base">Years of Experience</p>
            </div>

            <div className="flex flex-row gap-3 sm:gap-5 items-center px-4 sm:px-7 py-2 sm:py-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">250</h1>
              <p className="text-[#05BF8E] text-xs sm:text-sm md:text-base">Number of courses</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default TimeLineSection

import React from 'react'
import CTAbutton from './CTAbutton'
import Highlight from './HighLightText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

function CodeBlocks({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) {
  return (
    <div
      className={`flex ${position} my-10 md:my-20 justify-between flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16`}
    >
      {/* Left Section - Text and Buttons */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6 md:gap-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
        {heading}

        <div className="text-[#838894] text-sm sm:text-base font-medium w-[90%] mx-auto lg:mx-0 lg:w-[85%] -mt-2">
          {subHeading}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 justify-center lg:justify-start">
          <CTAbutton active={ctabtn1.active} LinkTo={ctabtn1.link}>
            <div className="flex gap-2 items-center justify-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAbutton>

          <CTAbutton active={ctabtn2.active} LinkTo={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAbutton>
        </div>
      </div>

      {/* Right Section - Code Animation */}
      <div className="relative w-full lg:w-[470px] max-w-[90%] sm:max-w-[80%] md:max-w-[600px] mx-auto lg:mx-0 code-border flex flex-row py-4 px-3 sm:px-5 text-[10px] sm:text-sm md:text-base leading-[18px] sm:leading-6">
        {backgroundGradient}

        {/* Line Numbers */}
        <div className="text-center flex flex-col w-[10%] select-none text-[#6E727F] font-inter font-bold">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code Text */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, '']}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: 'pre-line',
              display: 'block',
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks

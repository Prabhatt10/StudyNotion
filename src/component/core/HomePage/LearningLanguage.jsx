import React from 'react'
import HighLightText from './HighLightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.svg'
import compareWithOthers from '../../../assets/Images/Compare_with_others.svg'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAbutton from './CTAbutton'

function LearningLanguage() {
  return (
    <div className="px-4 md:px-10 lg:px-20">
      <div className="flex flex-col gap-5 mt-24 mb-24 items-center">
        
        {/* Heading */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
          Your Swiss Knife For
          <HighLightText text=" Learning any Language" />
        </div>

        {/* Subheading */}
        <div className="text-center text-[#424854] text-sm sm:text-base md:text-lg font-medium max-w-[90%] md:max-w-[70%] py-5">
          Using spin making learning multiple languages easy. With 20+ languages, realistic voice-over, progress tracking, custom schedule and more.
        </div>

        {/* Images Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-5 relative">
          <img 
            src={knowYourProgress} 
            alt="Know Your Progress" 
            className="object-contain w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] relative md:-mr-16 lg:-mr-32 z-10"
          />
          <img 
            src={compareWithOthers} 
            alt="Compare With Others" 
            className="object-contain w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px] z-20"
          />
          <img 
            src={planYourLessons} 
            alt="Plan Your Lessons" 
            className="object-contain w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px] relative md:-ml-16 lg:-ml-36 z-10"
          />
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center items-center">
          <CTAbutton active={true} LinkTo={"/signup"}>
            Learn More
          </CTAbutton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguage

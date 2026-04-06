import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import PublishCourse from "./PublishCourse/PublishCourse"

function RenderSteps() {

  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: 'Course Information' },
    { id: 2, title: 'Course Builder' },
    { id: 3, title: 'Publish' },
  ]

  return (
    <>
      {/* Stepper */}
      <div className="flex w-full items-center justify-between mb-6 sm:mb-8">

        {steps.map((item, index) => (
          <React.Fragment key={item.id}>

            {/* Step Circle */}
            <div className="flex flex-col items-center flex-1">

              <button
                className={`
                  flex items-center justify-center
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full border
                  text-xs sm:text-sm font-medium

                  ${step === item.id
                    ? 'border-[#FFD60A] bg-[#251400] text-[#FFD60A]'
                    : 'border-[#2C333F] bg-[#161D29] text-[#838894]'
                  }

                  ${step > item.id ? 'bg-[#FFD60A] text-[#161D29]' : ''}
                `}
              >
                {step > item.id ? (
                  <FaCheck className="text-xs sm:text-sm" />
                ) : (
                  item.id
                )}
              </button>

              {/* Title */}
              <p
                className={`
                  mt-2 text-[10px] sm:text-xs md:text-sm text-center
                  ${step >= item.id ? "text-[#F1F2FF]" : "text-[#585D69]"}
                `}
              >
                {item.title}
              </p>
            </div>

            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-1 sm:mx-2">
                <div
                  className={`
                    w-full h-full border-b-2 border-dashed
                    ${step > item.id ? 'border-[#FFD60A]' : 'border-[#585D69]'}
                  `}
                />
              </div>
            )}

          </React.Fragment>
        ))}

      </div>

      {/* Forms */}
      <div className="w-full">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </>
  )
}

export default RenderSteps
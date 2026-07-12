import React from 'react'
import RenderSteps from './RenderSteps'

function AddCourse() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-5 h-full py-10">
      <div className="flex flex-col xl:flex-row w-full gap-6 ">
        
        {/* Left Section */}
        <div className="flex flex-1 flex-col">
          <h1 className="mb-8 sm:mb-10 lg:mb-14 text-2xl sm:text-3xl font-medium text-[#F1F2FF]">
            Add Course
          </h1>

          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full rounded-md border border-[#2C333F] bg-[#161D29] p-4 sm:p-6 xl:sticky xl:top-10 h-120 ">
          
          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-[#F1F2FF]">
            ⚡ Course Upload Tips
          </p>

          <ul className="ml-5 list-disc space-y-3 sm:space-y-4 text-xs sm:text-sm text-[#F1F2FF]">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default AddCourse
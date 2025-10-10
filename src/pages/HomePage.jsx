import React from 'react'
import { GoArrowRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import HighLightText from '../component/core/HomePage/HighLightText'
import CTAbutton from '../component/core/HomePage/CTAbutton'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../component/core/HomePage/CodeBlocks'
import bgHome from '../assets/Images/bghome.svg'
import TimeLineSection from '../component/core/HomePage/TimeLineSection'
import LearningLanguage from '../component/core/HomePage/LearningLanguage'
import BecomeInstructorSection from '../component/core/HomePage/BecomeInstructorSection'
import Footer from '../component/common/Foooter'
import ExploreMore from '../component/core/HomePage/ExploreMore'

function HomePage() {
  return (
    <div className="text-white">
      {/* Top container */}
      <div className="relative mx-auto w-11/12 max-w-7xl flex flex-col items-center justify-between pt-12 sm:pt-16">
        <Link to="/signup" className="w-full flex justify-center">
          <div className="group p-2 rounded-full bg-[#161D29] font-bold text-[#C5C7D4] transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-x-2 rounded-full px-6 sm:px-10 py-1.5 group-hover:bg-[#000814]">
              <p>Become a instructor</p>
              <GoArrowRight />
            </div>
          </div>
        </Link>

        {/* Hero heading */}
        <div className="text-center mt-6 sm:mt-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight">
            Empower Your Future with
            <HighLightText text={' Coding Skills'} />
          </h1>
        </div>

        {/* Subheading */}
        <p className="w-full max-w-3xl text-center text-sm sm:text-base md:text-lg font-medium text-[#838894] mt-4 sm:mt-6 px-4">
          With our online coding courses, learn at a comfortable pace from anywhere with hands‑on projects, quizzes, and personalized feedback from instructors.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8">
          <CTAbutton active={true} LinkTo={'/signup'}>
            Learn More
          </CTAbutton>
          <CTAbutton active={false} LinkTo={'/login'}>
            Book a Demo
          </CTAbutton>
        </div>

        {/* Responsive video */}
        <div className="w-full mt-8 sm:mt-10 px-3">
          <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_5px_rgba(17,138,178,0.4)] hover:shadow-[0_0_40px_10px_rgba(17,138,178,0.6)] transition-all duration-300">
            <div className="w-full aspect-video">
              <video
                className="w-full h-full rounded-2xl border border-[#118AB2]/20 object-cover"
                muted
                loop
                autoPlay
                playsInline
              >
                <source src={Banner} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* CodeBlocks 1 */}
        <div className="w-full mt-10 sm:mt-12">
          <CodeBlocks
            position={'lg:flex-row'}
            heading={
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                Unlock Your
                <HighLightText text={' coding potential '} />
                with our online courses.
              </div>
            }
            subHeading={
              'Our courses are designed and taught by industry experts with years of experience who are passionate about sharing practical knowledge.'
            }
            ctabtn1={{
              btnText: 'Try It Yourself',
              LinkTo: '/signup',
              active: true,
            }}
            ctabtn2={{
              btnText: 'Learn More',
              LinkTo: '/login',
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
          />
        </div>

        {/* CodeBlocks 2 */}
        <div className="w-full ">
          <CodeBlocks
            position={'lg:flex-row-reverse'}
            heading={
              <div className="w-full lg:w-1/2 text-2xl sm:text-3xl md:text-4xl font-semibold">
                Start
                <HighLightText text={' coding in seconds '} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try—this hands‑on environment has real code from the very first lesson."
            }
            ctabtn1={{
              btnText: 'Continue Lesson',
              link: '/signup',
              active: true,
            }}
            ctabtn2={{
              btnText: 'Learn More',
              link: '/signup',
              active: false,
            }}
            codeColor={'text-red-500'}
            codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\n  return (\n    <div>Home</div>\n  )\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute" />}
          />
        </div>

        <div>
          <ExploreMore />
        </div>


      </div>

      {/* Mid band with background image */}
      <section className="bg-[#F9F9F9] text-[#2C333F] mt-12 sm:mt-16">
        <div
          className="h-[220px] sm:h-[260px] md:h-[310px] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgHome})` }}
        >
          <div className="w-11/12 max-w-7xl mx-auto h-full flex items-center justify-center gap-5 flex-col">
            <div className="h-[40px] sm:h-[60px] md:h-[100px]" />
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-white justify-center items-center">
              <CTAbutton active={true} LinkTo={'/signup'}>
                <div className="flex items-center gap-2 font-semibold">
                  Explore full catalogue
                  <GoArrowRight />
                </div>
              </CTAbutton>
              <CTAbutton active={false} LinkTo={'/login'}>
                <div className="flex items-center gap-2 font-semibold">
                  Learn More
                </div>
              </CTAbutton>
            </div>
          </div>
        </div>

        {/* Skills / timeline block */}
        <div className="w-11/12 max-w-7xl mx-auto">
          <div className="h-[48px] sm:h-[60px] md:h-[90px]" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left */}
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold">
              Get the skills needed for a
              <HighLightText text={' job that is in demand '} />
            </div>

            {/* Right */}
            <div className="flex flex-col gap-6 md:gap-8 items-start">
              <p className="text-sm sm:text-base text-[#838894]">
                The modern StudyNotion sets the pace, and being competitive means combining professional skills with adaptable learning habits.
              </p>
              <CTAbutton active={true} LinkTo={'/signup'}>
                Learn More
              </CTAbutton>
            </div>
          </div>

          <div className="mt-10 sm:mt-12">
            <TimeLineSection />
          </div>

          <div className="mt-10 sm:mt-12 mb-12 sm:mb-16">
            <LearningLanguage />
          </div>
        </div>
      </section>

      {/* Bottom section */}
      <section className="w-11/12 max-w-7xl mx-auto my-12 sm:my-16 md:my-20 flex flex-col gap-6 sm:gap-8 items-center bg-[#000814] rounded-xl p-6 sm:p-8">
        <BecomeInstructorSection />
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-6">
          Review from Other Learners
        </h2>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage

import React from 'react'
import HighLightText from '../HomePage/HighLightText'

function Quote() {
  return (
    <div className=" text-xl md:text-4xl lg:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white ">
        We are passionate about revolutionizing the way we learn.
        Our innovative platform <HighLightText text={" Combine Technology"} className="text-xl md:text-4xl lg:text-4xl font-semibold"  />
        , {" "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            expertise
        </span> , and community to create an 
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "} unparalled educational experiance .
        </span> 
    </div>
  )
}

export default Quote
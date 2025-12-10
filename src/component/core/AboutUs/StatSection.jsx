import React from 'react'

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

function StatSection() {
  return (
    <div className='w-full bg-[#2C333F] h-[150px] py-[40px]' >
        <div className="flex flex-col gap-10 justify-between w-11/12 max-w-[1260px] text-white mx-auto ">
            <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                {
                    Stats.map((data,index) => (
                        <div key={index} >
                            <h1 className="text-[30px] font-bold text-[#F1F2FF] ">
                                {data.count}
                            </h1>
                            <h2 className="font-semibold text-[16px] text-richblack-500">
                                {data.label}
                            </h2>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default StatSection
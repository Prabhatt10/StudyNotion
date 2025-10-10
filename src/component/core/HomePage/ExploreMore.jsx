import React from 'react'
import { useState } from 'react';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';
import {HomePageExploreData} from '../../../data/homepage-explore'

const tabsname = [
    "Free",
    "New To Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths"
]

function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabsname[0]);
    const [courses ,setCourses] = useState(HomePageExploreData[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExploreData[0].courses[0].heading);

    const setMyCard = (value) => {
        setCurrentTab(value); // update the current tab
        const result = HomePageExploreData.filter((course) => course.tag.toLowerCase() === value.toLowerCase());
        if (result.length > 0) {
            setCourses(result[0].courses);           // update courses for this tab
            setCurrentCard(result[0].courses[0].heading);    // set first course object as selected
        }
    };



  return (
    <div>
        <div>
            <h1 className='text-4xl font-semibold text-center' >
                Unlock the 
                <HighLightText text={" Power Of Code"}/>
            </h1>
            <p className='text-[#838894] text-center text-md text-[16px] mt-3'>
                Learn To build anything you can imagine 
            </p>
            <div className='flex flex-row bg-[#161D29] rounded-full border border-[#AFB2BF] mt-4 px-1 py-1 mb-40'>
                {
                    tabsname.map( (element,index) => {
                        return (
                            <div className={`text-[16px] flex flex-row items-center gap-2 
                            ${currentTab === element ? 
                            "bg-[#000814] text-[#DBDDEA] font-medium " :
                            "text-[#999DAA]" } rounded-full transition-all duration-200 cursor-pointer
                            hover:bg-[#000814] hover:text-[#DBDDEA] px-4 py-2  `} 
                            key={index} 
                            onClick={() => setMyCard(element)}>
                                {element}
                            </div>
                        )
                    })
                }
            </div>
            <div className=' flex gap-9 w-full justify-center -mt-18 flex-wrap lg:absolute right-0 left-0 mr-auto ml-auto '>
                {
                    courses.map( (element,index) => {
                        return ( 
                            <CourseCard 
                                key={index}
                                cardData = {element}
                                currentCard = {currentCard}
                                setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ExploreMore


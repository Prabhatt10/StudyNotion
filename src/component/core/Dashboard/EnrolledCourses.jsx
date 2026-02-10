import React, { useEffect, useState } from 'react'
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'
import ProgressBar from "@ramonak/react-progress-bar"

function EnrolledCourses() {
    const {token} = useSelector((state) => state.auth)
    const [enrolledCourses,setEnrolledCourses]= useState(null);

    async function getEnrolledCourses(){
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Unable to fetch Enrolled Courses")
            console.log(error.message);
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);


  return (
    <div className='text-white'>
        <h1>Enrolled Courses</h1>
        {
            !enrolledCourses ? (
                <p>Loading...</p>
            ) : enrolledCourses.length === 0 ? (
                <p>You have not enrolled in any course</p>
            ) : (
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {
                        enrolledCourses.map((course,index) => (
                            <div key={index}>
                                <div >
                                    <img src={course.thumbnail}/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>
                                <div>
                                    {course?.totalDuration}
                                </div>
                                <div>
                                    <p>Progress : {course.progressPercentage || 0}</p>
                                    <ProgressBar 
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses
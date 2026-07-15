// import React from 'react'
// import { useEffect, useState } from "react"
// import { VscAdd } from "react-icons/vsc"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
// import IconButton from '../../common/IconButton'
// import CourseTable from './InstructorCourses/CourseTable'


// function MyCourses() {
//     const { token } = useSelector((state) => state.auth);
//     const navigate = useNavigate();
//     const [courses,setCourses] = useState([]);

//     useEffect(() => {
//       const fetchCourses = async () => {
//         const result = await fetchInstructorCourses(token);
//         if(result){
//           setCourses(result);
//         }
//       }
//       fetchCourses();
//     },[])

//   return (
//     <div>
//       <div className='mb-14 flex items-center justify-between'>
//         <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>
//         <IconButton
//           text="Add Course"
//           onclick={() => navigate("/dashboard/add-course")}
//         >
//           <VscAdd />
//         </IconButton>
//       </div>
//       {
//         courses && <CourseTable courses={courses} setCourses={setCourses} />
//       }
//     </div>
//   )
// }

// export default MyCourses

import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconButton from "../../common/IconButton";
import CourseTable from "./InstructorCourses/CourseTable";

function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      console.log("Token:", token);

      const result = await fetchInstructorCourses(token);

      console.log("Courses:", result);

      if (result) {
        setCourses(result);
      }
    };

    if (token) {
      fetchCourses();
    }
  }, [token]);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">
          My Courses
        </h1>

        <IconButton
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconButton>
      </div>

      <CourseTable
        courses={courses}
        setCourses={setCourses}
      />
    </div>
  );
}

export default MyCourses;
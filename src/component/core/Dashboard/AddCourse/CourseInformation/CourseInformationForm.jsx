import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
// import {courseDetailsAPI} from '../../../../../services/operations/courseDetailsAPI' 

function CourseInformationForm() {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState : {errors}
  } = useForm();

  const dispatch = useDispatch();
  const {course, editCourse} = useSelector((state) => state.course);
  const [loading,setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState();

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if(categories.length > 0){
        setCourseCategory(categories);
      }
      setLoading(false);
    }
    getCategories();
    if(editCourse){
      setValue("courseTitle", course.courseName);
      setValue("courseShortDescription", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  },[])

  const onSubmit =  async (data) => {
    
  }


  return (
    <div>
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className='rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8'
        >
          <div>
            <label
              id='courseTitle'
              placeHolder='Enter Current Title'
              {...register }
            />
          </div>
        </form>
    </div>
  )
}

export default CourseInformationForm
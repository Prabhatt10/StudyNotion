import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import Upload from '../Upload';
import ChipInput from './ChipInput';
import RequirementField from './RequirementField';
import IconButton from '../../../../../component/common/IconButton'
import { MdNavigateNext } from 'react-icons/md';

import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/CourseSlice";

import { 
  fetchCourseCategories,
  addCourseDetails,
  editCourseDetails
} from '../../../../../services/operations/courseDetailsAPI'

function CourseInformationForm() {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();

  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);

  useEffect(() => {

    const getCategories = async () => {
      
      setLoading(true);

      const categories = await fetchCourseCategories();

      if (categories?.length > 0) {
        setCourseCategory(categories);
      }

      setLoading(false);
    }

    getCategories();

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDescription", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      // setValue("courseCategory", course.category);
      setValue("courseCategory", course.category?._id);
      setValue("courseRequirements", course.instructions);
      setValue("courseThumbnail", course.thumbnail);
    }
    // getCategories();
  },[])

  // const onSubmit = async (data) => {
  //   if(editCourse){
  //     const currentValues = getValues();
  //     const formData = new FormData();
  //   }
  // }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let result = null;
      const formData = new FormData();

      if (editCourse) {
        formData.append("courseId", course._id);
      }

      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDescription);
      formData.append("price", data.coursePrice);
      formData.append("category", data.courseCategory);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("tag", JSON.stringify(data.courseTags));
      formData.append(
        "instructions",
        JSON.stringify(data.courseRequirements)
      );

      if (data.courseThumbnail) {
        formData.append("thumbnailImage", data.courseThumbnail);
      }

      if (editCourse) {
        result = await editCourseDetails(formData, token);
      } else {
        result = await addCourseDetails(formData, token);
      }

      if (result) {
        dispatch(setCourse(result));
        dispatch(setStep(2));
      }
    } catch (error) {
      console.error("COURSE SUBMIT ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8'
      >

        {/* Course Title */}
        <div className="flex flex-col space-y-2">

          <label
            className="text-sm text-richblack-5"
            htmlFor="courseTitle"
          >
            Course Title
            <sup className="text-pink-200">*</sup>
          </label>

          <input
            id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle", { required: true })}
            className='w-full form-style bg-richblack-700 text-richblack-5 rounded-md p-2'
          />

          {
            errors.courseTitle && (
              <span className='text-pink-200 text-sm'>
                Course Title is required
              </span>
            )
          }

        </div>

        {/* Course Short Description */}
        <div className="flex flex-col space-y-2">

          <label
            className="text-sm text-richblack-5"
            htmlFor="courseShortDescription"
          >
            Course Short Description
            <sup className="text-pink-200">*</sup>
          </label>

          <textarea
            id='courseShortDescription'
            placeholder='Enter Description'
            {...register("courseShortDescription", { required: true })}
            className='min-h-[140px] w-full bg-richblack-700 text-richblack-5 rounded-md form-style p-2'
          />

          {
            errors.courseShortDescription && (
              <span className='text-pink-200 text-sm'>
                Course Short Description is required
              </span>
            )
          }

        </div>

        {/* Course Price */}
        <div className="flex flex-col space-y-2 relative">

          <label
            className="text-sm text-richblack-5"
            htmlFor="coursePrice"
          >
            Course Price
            <sup className="text-pink-200">*</sup>
          </label>

          <input
            id='coursePrice'
            type='number'
            placeholder='Enter Price'
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true
            })}
            className='w-full bg-richblack-700 text-richblack-5 rounded-md form-style p-2 '
          />

          <HiOutlineCurrencyRupee className='absolute text-richblack-200 bottom-5 right-3' />

          {
            errors.coursePrice && (
              <span className='text-pink-200 text-sm'>
                Price is required
              </span>
            )
          }

        </div>

        {/* Course Category */}
        <div className='flex flex-col space-y-2'>

          <label
            className='text-sm text-richblack-5'
            htmlFor='courseCategory'
          >
            Course Category
            <sup className='text-pink-200'>*</sup>
          </label>

          <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", { required: true })}
            className='w-full bg-richblack-700 text-richblack-5 rounded-md form-style p-2'
          >

            <option value="" disabled>
              Select Category
            </option>

            {
              courseCategory?.map((category, idx) => (
                <option
                  key={idx}
                  value={category?._id}
                >
                  {category?.name}
                </option>
              ))
            }

          </select>

          {
            errors.courseCategory && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course Category is required
              </span>
            )
          }

        </div>

        {/* Course Tags */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Upload Thumbnail */}
        <Upload
          label='Course Thumbnail'
          name='courseThumbnail'
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Course Benefits */}
        <div className="flex flex-col space-y-2">

          <label
            className="text-sm text-richblack-5"
            htmlFor="courseBenefits"
          >
            What will students learn?
            <sup className="text-pink-200">*</sup>
          </label>

          <textarea
            id='courseBenefits'
            placeholder='Enter Benefits'
            {...register("courseBenefits", { required: true })}
            className='min-h-[140px] w-full bg-richblack-700 text-richblack-5 rounded-md form-style p-2'
          />

          {
            errors.courseBenefits && (
              <span className='text-pink-200 text-sm'>
                Course Benefits are required
              </span>
            )
          }

        </div>

        {/* Course Requirements */}
        <RequirementField
          label="Course Requirements"
          name="courseRequirements"
          placeholder="Enter Requirements and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Button */}
        <div className='flex justify-end gap-x-2'>

          {
            editCourse && (
              <button 
                type='button'
                onClick={() => dispatch(setStep(2))}
                disabled={loading}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Continue Without Saving
              </button>
            )
          }

          <IconButton
            type='submit'
            disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}
          >
            <MdNavigateNext className='text-lg' />
          </IconButton>

        </div>

      </form>
    </div>
  )
}

export default CourseInformationForm
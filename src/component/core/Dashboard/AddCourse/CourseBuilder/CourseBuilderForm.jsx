import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../../../component/common/IconButton'
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import {toast} from 'react-hot-toast'
import NestedView from './NestedView';

import {
  createSection,
  UpdateSection
} from '../../../../../services/operations/courseDetailsAPI';

import {
  setCourse,
  setEditCourse,
  setStep
} from '../../../../../slices/CourseSlice'



function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const [loading,setLoading] = useState(false);
  const [editSelectionName, setSelectionName] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);

    let result;

    if(editSelectionName) {
      result = await UpdateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSelectionName,
          courseId: course._id,
        },
        token
      );
    }
    else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    if(result) {
      dispatch(setCourse(result));
      setEditSelectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  }


  const cancelEdit = () => {
    setEditSelectionName(null);
    setValue("sectionName", "");
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSelectionName === sectionId) {
      cancelEdit();
      return
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }


  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p  className="text-2xl font-semibold text-richblack-5">
          Course Builder
        </p>
        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
          <div  className="flex flex-col space-y-2">
            <label htmlFor = 'sectionName' className="text-sm text-richblack-5">
              Section Name
              <sup className="text-pink-200">*</sup>
            </label>
            <input
              id = 'sectionName'
              type = 'text'
              placeholder = 'Add a section to build your course'
              {...register("sectionName", { required: true })}
              className='form-style w-full'
            />
            {
              errors.sectionName && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Section Name is required
                </span>
              )
            }
          </div>
          <div className="flex items-end gap-x-4">
            <IconButton 
              Type = 'submit'
              disabled = {loading}
              text = {editSectionName ? "Edit Section Name" : "Create Section"}
              outline = {true}
            >
              <IoAddCircleOutline size={20} className="text-yellow-500" />
            </IconButton>
            {
              editSectionName && (
                <button
                  type="button"
                  onClick = {cancelEdit}
                  className='text-sm text-richblack-500 underline'
                >
                  Cancel Edit
                </button>
              )
            }
          </div>
        </form>
        {
          course.courseContent.length > 0 && (
            <NestedView 
              handleChangeEditSectionName = {handleChangeEditSectionName}
            />
          )
        }
        <div className='flex justify-end gap-x-3'>
          <button 
            onClick={goBack}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Back
          </button>
          <IconButton disabled = {loading} text='text' onClick={goToNext}>
            <MdNavigateNext />
          </IconButton>
        </div>
    </div>
  )
}

export default CourseBuilderForm
import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md"
import { useSelector } from 'react-redux'

function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues
}) {

  const { editCourse, course } = useSelector((state) => state.course)

  const [chips, setChips] = useState([])

  // Load previous tags while editing
  useEffect(() => {

    if (editCourse && course?.tag) {
      setChips(course.tag)
    }

    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })

  }, [])

  // Update form values whenever chips change
  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  // Handle Enter Key
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      e.preventDefault()

      const chipValue = e.target.value.trim()

      // Prevent empty chip
      if (chipValue === "") return

      // Prevent duplicate chip
      if (!chips.includes(chipValue)) {
        setChips([...chips, chipValue])
      }

      // Clear input
      e.target.value = ""
    }
  }

  // Delete Chip
  const deleteChip = (indexToDelete) => {
    setChips(
      chips.filter((_, index) => index !== indexToDelete)
    )
  }

  return (
    <div className='flex flex-col gap-2 w-full'>

      {/* Label */}
      <label
        htmlFor={name}
        className='text-sm font-medium text-richblack-5'
      >
        {label}
        <sup className='text-pink-200'>*</sup>
      </label>

      {/* Chips Container */}
      <div className='flex min-h-[52px] w-full flex-wrap items-center gap-2 rounded-md border border-richblack-600 bg-richblack-700 p-2'>

        {
          chips.map((chip, index) => (
            <div
              key={index}
              className='flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-richblack-900 break-all'
            >

              <span className='max-w-[180px] truncate sm:max-w-[250px]'>
                {chip}
              </span>

              <button
                type='button'
                onClick={() => deleteChip(index)}
                className='flex items-center justify-center'
              >
                <MdClose className='text-base' />
              </button>

            </div>
          ))
        }

        {/* Input */}
        <input
          id={name}
          type='text'
          placeholder={placeholder}
          className='min-w-[120px] flex-1 bg-transparent p-2 text-richblack-5 outline-none placeholder:text-richblack-400'
          onKeyDown={handleKeyDown}
        />

      </div>

      {/* Error */}
      {
        errors[name] && (
          <span className='ml-1 text-xs tracking-wide text-pink-200'>
            At least one {label} is required
          </span>
        )
      }

    </div>
  )
}

export default ChipInput
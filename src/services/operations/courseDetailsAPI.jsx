import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints, categoriesEndpoints } from "../apis"

// ✅ Destructure updated endpoints
const {
  CREATE_COURSE_API,
  GET_ALL_COURSE_API,
  GET_COURSE_DETAILS_API,
  UPDATE_COURSE,
  DELETE_COURSE_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  CREATE_RATING,
  AVERAGE_RATING,
} = courseEndpoints

const { GET_ALL_CATEGORIES_API } = categoriesEndpoints

// ✅ Fetch all courses
export const getAllCourses = async () => {
  const toastId = toast.loading("Loading courses...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) throw new Error("Could not fetch courses")
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COURSE_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Fetch course details
export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading course details...")
  let result = null
  try {
    const response = await apiConnector("POST", GET_COURSE_DETAILS_API, { courseId })
    if (!response.data.success) throw new Error(response.data.message)
    result = response.data
  } catch (error) {
    console.log("GET_COURSE_DETAILS_API ERROR →", error)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Fetch all categories
export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_CATEGORIES_API)
    if (!response?.data?.success) throw new Error("Could not fetch categories")
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_CATEGORIES_API ERROR →", error)
    toast.error(error.message)
  }
  return result
}

// ✅ Add new course
export const addCourseDetails = async (data, token) => {
  const toastId = toast.loading("Adding course...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not add course details")
    toast.success("Course created successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE_COURSE_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Update existing course
export const editCourseDetails = async (data, token) => {
  const toastId = toast.loading("Updating course...")
  let result = null
  try {
    const response = await apiConnector("POST", UPDATE_COURSE, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not update course")
    toast.success("Course updated successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE_COURSE ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Delete course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Deleting course...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not delete course")
    toast.success("Course deleted successfully")
  } catch (error) {
    console.log("DELETE_COURSE_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// ✅ Create section
export const createSection = async (data, token) => {
  const toastId = toast.loading("Creating section...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not create section")
    toast.success("Section created successfully")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("CREATE_SECTION_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Update section
export const updateSection = async (data, token) => {
  const toastId = toast.loading("Updating section...")
  let result = null
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not update section")
    toast.success("Section updated successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE_SECTION_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Delete section
export const deleteSection = async (data, token) => {
  const toastId = toast.loading("Deleting section...")
  let result = null
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not delete section")
    toast.success("Section deleted successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE_SECTION_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Create sub-section (lecture)
export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Adding lecture...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not add lecture")
    toast.success("Lecture added successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE_SUBSECTION_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Update sub-section
export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Updating lecture...")
  let result = null
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not update lecture")
    toast.success("Lecture updated successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE_SUBSECTION_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Delete sub-section
export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Deleting lecture...")
  let result = null
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not delete lecture")
    toast.success("Lecture deleted successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE_SUBSECTION_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Create rating
export const createRating = async (data, token) => {
  const toastId = toast.loading("Submitting rating...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could not create rating")
    toast.success("Rating submitted successfully")
    success = true
  } catch (error) {
    console.log("CREATE_RATING_API ERROR →", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}

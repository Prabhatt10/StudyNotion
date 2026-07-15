// ✅ Works correctly with Vite
export const BASE_URL = import.meta.env.VITE_BASE_URL;

// ✅ Always use template literals for cleaner URLs

export const authEndpoints = {
  SEND_OTP_API : `${BASE_URL}/auth/sendOtp`,
  SIGNUP_API : `${BASE_URL}/auth/signUp`,
  LOGIN_API : `${BASE_URL}/auth/login`,
  CHANGE_PASSWORD_API : `${BASE_URL}/auth/changePassword`,
  UPDATE_PASSWORD_API : `${BASE_URL}/auth/updatePassword`,
}

export const resetPasswordEndpoints = {
  RESET_PASSWORD_TOKEN_API : `${BASE_URL}/resetPassword/resetPasswordToken`,
  RESET_PASSWORD_API : `${BASE_URL}/resetPassword/resetPassword`,
}

export const profileEndpoints = {
  UPDATE_DISPLAY_PICTURE_API : `${BASE_URL}/profile/updateDisplayPicture`,
  UPDATE_PROFILE_API : `${BASE_URL}/profile/updateProfile` ,
  DELETE_PROFILE_API :  `${BASE_URL}/profile/deleteProfile`,
  GET_ALL_USER_DETAILS_API : `${BASE_URL}/profile/getAllUserDetails` ,
  GET_USER_ENROLLED_COURSES_API : `${BASE_URL}/profile/getUserEnrolledCourses`,
  GET_INSTRUCTOR_DATA_API : `${BASE_URL}/profile/getInstructorData`,
}

export const courseEndpoints = {
  CREATE_COURSE_API : `${BASE_URL}/course/createCourse`, 
  GET_ALL_COURSE_API : `${BASE_URL}/course/getAllCourse`,
  GET_COURSE_DETAILS_API : `${BASE_URL}/course/getCourseDetails`,
  UPDATE_COURSE_API : `${BASE_URL}/course/updateCourse`,
  DELETE_COURSE_API : `${BASE_URL}/course/deleteCourse`,
  GET_FULL_COURSE_DETAILS_API : `${BASE_URL}/course/getFullCourseDetails`,
  GET_INSTRUCTOR_COURSES_API : `${BASE_URL}/course/getInstructorCourses`,
  // GET_INSTRUCTOR_COURSES_API: `${BASE_URL}/course/my-courses`,
  CREATE_SECTION_API : `${BASE_URL}/course/createSection`,
  UPDATE_SECTION_API : `${BASE_URL}/course/updateSection`,
  DELETE_SECTION_API : `${BASE_URL}/course/deleteSection`,
  CREATE_SUBSECTION_API : `${BASE_URL}/course/createSubSection`,
  UPDATE_SUBSECTION_API : `${BASE_URL}/course/updateSubSection`,
  DELETE_SUBSECTION_API : `${BASE_URL}/course/deleteSubSection`,
  CREATE_RATING_API : `${BASE_URL}/course/createRating`,
  AVERAGE_RATING_API : `${BASE_URL}/course/averageRating`,
}

export const categoriesEndpoints = {
  GET_ALL_CATEGORIES_API: `${BASE_URL}/category/getAllCategory`,
  CREATE_CATEGORY_API : `${BASE_URL}/category/createCategory`,
  CATEGORY_PAGE_DETAILS_API : `${BASE_URL}/category/categoryPageDetails`
};

export const ratingEndpoints = {
  GET_ALL_REVIEWS : `${BASE_URL}/course/GET_ALL_REVIEW`
}

export const catalogEndpoint = {
  CATEGORY_PAGE_DETAILS_API : `${BASE_URL}/category/categoryPageDetails`,
}
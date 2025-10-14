// ✅ Works correctly with Vite
export const BASE_URL = import.meta.env.VITE_BASE_URL;

// ✅ Always use template literals for cleaner URLs

export const authEndpoints = {
  SEND_OTP_API : `${BASE_URL}/auth/sendOtp`,
  SIGNUP_API : `${BASE_URL}/auth/signUp`,
  LOGIN_API : `${BASE_URL}/auth/login`,
  CHANGE_PASSWORD_API : `${BASE_URL}/auth/changePassword`,
}

export const resetPasswordEndpoints = {
  RESET_PASSWORD_TOKEN_API : `${BASE_URL}/resetPassword/resetPasswordToken`,
  RESET_PASSWORD_API : `${BASE_URL}/resetPassword/resetPassword`,
}

export const profileEndpoints = {
  UPDATE_PROFILE_API : `${BASE_URL}/profile/updateProfile` ,
  DELETE_PROFILE_API :  `${BASE_URL}/profile/deleteProfile`,
  GET_ALL_USER_DETAILS_API : `${BASE_URL}/profile/getAllUserDetails` ,
}

export const courseEndpoints = {
  CREATE_COURSE_API : `${BASE_URL}/course/createCourse`,
  GET_ALL_COURSE_API : `${BASE_URL}/course/getAllCourse`,
  GET_COURSE_DETAILS_API : `${BASE_URL}/course/getCourseDetails`,
  UPDATE_COURSE : `${BASE_URL}/course/updateCourse`,
  DELETE_COURSE_API : `${BASE_URL}/course/deleteCourse`,
  CREATE_SECTION_API : `${BASE_URL}/course/createSection`,
  UPDATE_SECTION_API : `${BASE_URL}/course/updateSection`,
  DELETE_SECTION_API : `${BASE_URL}/course/deleteSection`,
  CREATE_SUBSECTION_API : `${BASE_URL}/course/createSubSection`,
  UPDATE_SUBSECTION_API : `${BASE_URL}/course/updateSubSection`,
  DELETE_SUBSECTION_API : `${BASE_URL}/course/deleteSubSection`,
  CREATE_RATING : `${BASE_URL}/course/createRating`,
  AVERAGE_RATING : `${BASE_URL}/course/averageRating`
}

export const categoriesEndpoints = {
  GET_ALL_CATEGORIES_API: `${BASE_URL}/category/getAllCategory`,
  CREATE_CATEGORY_API : `${BASE_URL}/category/createCategory`,
};

export const ratingEndpoints = {
  GET_ALL_REVIEWS : `${BASE_URL}/course/GET_ALL_REVIEW`
}

export const catalogEndpoint = {
  CATEGORY_PAGE_DETAILS_API : `${BASE_URL}/category/categoryPageDetails`,
}
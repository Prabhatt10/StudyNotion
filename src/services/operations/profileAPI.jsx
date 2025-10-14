import { toast } from "react-hot-toast";

import { setLoading, setUser } from '../../slices/ProfileSlice'
import { apiConnector } from '../apiConnector'
import { profileEndpoints } from "../api";
import { logout } from './authAPI'

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Could not get user details");
      }

      const userData = response.data.data;
      const userImage = userData.image
        ? userData.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;

      dispatch(setUser({ ...userData, image: userImage }));
    } catch (error) {
      console.error("GET_USER_DETAILS API ERROR............", error);
      toast.error(error?.message || "Could not get user details");
      dispatch(logout(navigate));
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch enrolled courses");
    }

    result = response.data.data || [];
  } catch (error) {
    console.error("GET_USER_ENROLLED_COURSES_API ERROR............", error);
    toast.error(error?.message || "Could not get enrolled courses");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch instructor data");
    }

    result = response.data.courses || [];
  } catch (error) {
    console.error("GET_INSTRUCTOR_API ERROR............", error);
    toast.error(error?.message || "Could not get instructor data");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
}

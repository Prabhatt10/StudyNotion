import { toast } from "react-hot-toast";
import { setUser } from '../../slices/ProfileSlice'
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";
import { authEndpoints } from "../api";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API, // profile
  UPDATE_PROFILE_API, // profile
  DELETE_PROFILE_API, // profile
} = profileEndpoints;

const {
   CHANGE_PASSWORD_API,
   UPDATE_PASSWORD_API
} = authEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Uploading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
          // DO NOT manually set multipart type, Axios sets it automatically
        }
      );

      console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to update picture");
      }

      dispatch(setUser(response.data.data));
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API ERROR:", error);
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      );

      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      // check success
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to update profile");
      }

      const userData = response?.data?.updatedUserDetails;

      if (!userData) {
        throw new Error("updatedUserDetails missing in server response");
      }

      // If user image exists, use it — else fallback to initials avatar
      const userImage =
        userData?.image ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;

      // Update redux store
      dispatch(setUser({ ...userData, image: userImage }));

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error(error?.message || "Could Not Update Profile");
    }

    toast.dismiss(toastId);
  };
}


export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

    if (!response?.data?.success) throw new Error(response?.data?.message || "Failed to change password");

    toast.success("Password Changed Successfully");
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error?.response?.data?.message || error?.message || "Could Not Change Password");
  }
  toast.dismiss(toastId);
}

export async function updatePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_PASSWORD_API API RESPONSE............", response);
    if (!response?.data?.success) throw new Error(response?.data?.message || "Failed to update password");

    toast.success("Password Updated Successfully");
  }
  catch (error) {
    console.log("UPDATE_PASSWORD_API API ERROR............", error);
    toast.error(error?.response?.data?.message || error?.message || "Could Not Update Password");
  }
  toast.dismiss(toastId);
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response?.data?.success) throw new Error(response?.data?.message || "Failed to delete profile");

      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error(error?.message || "Could Not Delete Profile");
    }
    toast.dismiss(toastId);
  };
}

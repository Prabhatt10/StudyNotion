import toast from "react-hot-toast";

import { setLoading, setToken } from "../../slices/AuthSlice";
import { resetCart } from "../../slices/CartSlice";
import { setUser } from "../../slices/ProfileSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../api";
import { resetPasswordEndpoints } from "../api";

const {
  SEND_OTP_API,
  SIGNUP_API,
  LOGIN_API,
} = authEndpoints; // ✅ fixed variable name

const {
  RESET_PASSWORD_TOKEN_API,
  RESET_PASSWORD_API,
}  = resetPasswordEndpoints;

// ===================================================================
// SEND OTP
// ===================================================================
export function sendOTP(email, navigate) {
  return async (dispatch) => {
    const toastID = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SEND_OTP_API, {
        email,
        checkUserIsPresent: true,
      });
      console.log("SENDING API RESPONSE....", response);

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP Sent Successfully");
      // if (navigate && window.location.pathname !== "/verify-email") {
      //   navigate("/verify-email");
      // }
      navigate("/verify-email");
    } catch (error) {
      console.log("SEND OTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastID);
  };
}

// ===================================================================
// SIGNUP
// ===================================================================

// export function signUp(
//   accountType,
//   firstName,
//   lastName,
//   email,
//   password,
//   confirmPassword,
//   OTP,
//   navigate
// ) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...");
//     dispatch(setLoading(true));
//     try {
//       const response = await apiConnector("POST", SIGNUP_API, {
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//         otp: OTP, // ✅ backend usually expects "otp"
//       });
//       console.log("API response in signup operation");
//       console.log("SIGNUP API RESPONSE.....", response);
//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Signup Successful");
//       navigate("/login");
//     } catch (error) {
//       console.log("SIGNUP API ERROR.......", error);
//       toast.error("Signup Failed");
//       navigate("/signup");
//     }
//     dispatch(setLoading(false));
//     toast.dismiss(toastId);
//   };
// }

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  OTP,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing you up...");
    dispatch(setLoading(true));

    try {
      console.log("SIGNUP REQUEST BODY:", {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp: OTP,
      });

      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp: OTP, // ✅ Confirm backend expects lowercase "otp"
      });

      console.log("SIGNUP API RESPONSE:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup successful 🎉");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR:", error);
      toast.error(error?.response?.data?.message || "Signup Failed ❌");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}




// ===================================================================
// LOGIN
// ===================================================================
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN API RESPONSE........", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


// ===================================================================
//  LOGOT
// ===================================================================

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

// ===================================================================
// GET PASSWORD RESET TOKEN
// ===================================================================
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  };
}

// ===================================================================
// RESET PASSWORD
// ===================================================================
export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  };
}

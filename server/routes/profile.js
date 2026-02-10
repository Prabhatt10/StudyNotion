const express = require("express");
const router = express.Router();

const {
    updateProfile,
    deleteProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getUserEnrolledCourses,
    instructorDashboard
} = require("../controller/profile");

const { auth } = require("../middleware/auth");

router.put("/updateProfile",auth,updateProfile);
router.delete("/deleteProfile",auth,deleteProfile);
router.get("/getAllUserDetails",auth,getAllUserDetails);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
router.get("/getUserEnrolledCourses",auth,getUserEnrolledCourses);
router.get("/instructorDashboard",auth,instructorDashboard)

module.exports = router;
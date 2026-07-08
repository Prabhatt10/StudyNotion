const express = require("express");
const router = express.Router();
const { 
    auth,
    isStudent, 
    isAdmin, 
    isInstructor 
} = require('../middleware/auth');

const {
  createCourse,
  getAllCourse, 
  getCourseDetails,
  updateCourse,
  deleteCourse,
  getFullCourseDetails,
  getInstructorCourses
} = require('../controller/course');

router.post("/createCourse",auth,isInstructor,createCourse);
router.get("/getAllCourse",getAllCourse);
router.get("/getCourseDetails",getCourseDetails);
router.put(
  "/updateCourse",
  auth,
  isInstructor,
  updateCourse
);
router.delete("/deleteCourse",deleteCourse);
router.get("/getFullCourseDetails",auth,getFullCourseDetails);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);


module.exports = router;
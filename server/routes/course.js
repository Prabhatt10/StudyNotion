const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth');

const {createCourse,getAllCourse,getCourseDetails,updateCourse,deleteCourse} = require('../controller/course');

router.post("/createCourse",auth,createCourse);
router.get("/getAllCourse",getAllCourse);
router.get("/getCourseDetails",getCourseDetails);
router.put("/updateCourse",updateCourse);
router.delete("/deleteCourse",deleteCourse);


module.exports = router;
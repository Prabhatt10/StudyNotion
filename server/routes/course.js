const express = require("express");
const router = express.Router();


const {createCourse,getAllCourse,getCourseDetails} = require('../controller/course');

router.post("/createCourse",createCourse);
router.post("/getAllCourse",getAllCourse);
router.post("/getCourseDetails",getCourseDetails);


module.exports = router;
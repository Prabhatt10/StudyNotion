const express = require("express");
const router = express.Router();

const {createSection,updateSection,deleteSection} = require("../controller/section");
const {createSubSection,updateSubSection,deleteSubSection} = require("../controller/subSection");

const {
    auth,
    isStudent,
    isAdmin,
    isInstructor
} = require('../middleware/auth');

router.post("/createSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);

router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);



module.exports = router;
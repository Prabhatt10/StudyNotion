const express = require("express");
const router = express.Router();

const {createSection,updateSection,deleteSection} = require("../controller/section");
const {createSubSection,updateSubSection,deleteSubSection} = require("../controller/subSection");

router.post("/createSection",createSection);
router.post("/updateSection",updateSection);
router.post("/deleteSection",deleteSection);

router.post("/createSubSection",createSubSection);
router.post("/updateSubSection",updateSubSection);
router.post("/deleteSubSection",deleteSubSection);



module.exports = router;
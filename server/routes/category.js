const express = require("express");
const router = express.Router();

const {
    createCategory,
    getAllCategory,
    categoryPageDetails
} = require("../controller/category");

const {
    auth,
    isStudent,
    isAdmin,
    isInstructor
} = require('../middleware/auth');

router.post("/createCategory",auth,isInstructor,createCategory);
router.get("/getAllCategory",getAllCategory);
router.get("/categoryPageDetails",categoryPageDetails);


module.exports = router;
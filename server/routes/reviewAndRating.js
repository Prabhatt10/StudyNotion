const express = require("express");
const router = express.Router();

const {createRating,averageRating,getAllRating} = require("../controller/ratingAndReview");

const {
    auth,
    isStudent,
    isAdmin,
    isInstructor
} = require('../middleware/auth');

router.post("/createRating",auth,isStudent,createRating);
router.post("/averageRating",averageRating);
router.get("/getAllRating",getAllRating);


module.exports = router;
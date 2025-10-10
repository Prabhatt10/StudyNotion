const express = require("express");
const router = express.Router();

const {createRating,averageRating,getAllRating} = require("../controller/ratingAndReview");

router.post("/createRating",createRating);
router.post("/averageRating",averageRating);
router.get("/getAllRating",getAllRating);


module.exports = router;
const express = require("express");
const router = express.Router();

const {createCategory,getAllCategory,categoryPageDetails} = require("../controller/category");

router.post("/createCategory",createCategory);
router.get("/getAllCategory",getAllCategory);
router.get("/categoryPageDetails",categoryPageDetails);


module.exports = router;
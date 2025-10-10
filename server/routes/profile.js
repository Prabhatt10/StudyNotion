const express = require("express");
const router = express.Router();

const {updateProfile,deleteProfile,getAllUserDetails} = require("../controller/profile");

router.post("/updateProfile",updateProfile);
router.post("/deleteProfile",deleteProfile);
router.get("/getAllUserDetails",getAllUserDetails);

module.exports = router;
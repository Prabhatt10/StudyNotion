const express = require("express");
const router = express.Router();

const {updateProfile,deleteProfile,getAllUserDetails,updateDisplayPicture} = require("../controller/profile");
const {auth} = require("../middleware/auth");

router.put("/updateProfile",auth,updateProfile);
router.delete("/deleteProfile",auth,deleteProfile);
router.get("/getAllUserDetails",auth,getAllUserDetails);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports = router;
const express = require("express");
const router = express.Router();

const {sendOtp,signUp,login,changePassword} = require("../controller/auth");
const {auth} = require("../middleware/auth")

router.post("/sendOtp",sendOtp);
router.post("/signUp",signUp);
router.post("/login",login);

router.put("/changePassword",auth,changePassword);


module.exports = router; 
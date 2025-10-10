const express = require("express");
const router = express.Router();

const {sendOtp , signUp,login,changePassword} = require("../controller/auth");


router.post("/sendOtp",sendOtp);
router.post("signUp",signUp);
router.post("/login",login);
router.post("/changePassword",changePassword);


module.exports = router;
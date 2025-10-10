const express = require("express");
const router = express.Router();

const {resetPasswordToken,resetPassword} = require("../controller/resetPassword");

router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword",resetPassword);

module.exports = router;
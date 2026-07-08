const express = require("express");
const router = express.Router();

const {
    capturePayment, 
    verifySignature
} = require("../controller/payments");

const {
    auth,
    isStudent
} = require("../middleware/auth");


router.post("/capturePayment",capturePayment);


module.exports = router;
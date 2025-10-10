const express = require("express");

//import Router
const auth = require("./routes/auth.js");
const category = require("./routes/category.js");
const course = require('./routes/course.js');
// const payment = require('./routes/payment.js');
const profile = require("./routes/profile.js");
const resetPassword = require('./routes/resetPassword.js');
const reviewAndRating = require("./routes/reviewAndRating.js");
const sectionAndSubsection = require("./routes/sectionAndSubsection.js");


require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

const dbConnect = require('./config/database.js');
const cookieParser = require("cookie-parser");
dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",auth);
app.use("/api/v1/category",category);
app.use("/api/v1/course",course);
// app.use("/api/v1/payment",payment);
app.use("/api/v1/profile",profile);
app.use("/api/v1/resetPassword",resetPassword);
app.use("/api/v1/reviewAndRating",reviewAndRating);
app.use("/api/v1/sectionAndSubsection",sectionAndSubsection);

app.listen(PORT,()=>{
    console.log(`Server Starting at Port ${PORT}`);  
});
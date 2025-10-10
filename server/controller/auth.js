const USER = require("../model/user");
const OTP = require("../model/otp");
const otpGenerator = require("otp-generator");
const Profile = require("../model/profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { ClientSession } = require("mongodb");
require("dotenv").config();


// SendOtp

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserIsPresent = await USER.findOne({ email });

    if (checkUserIsPresent) {
      return res.status(401).json({
        success: false,
        message: 'User Already Present',
      });
    }

    // ✅ Hardcode numeric OTP generation
    let otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("OTP Generated:", otp);

    // Check uniqueness of OTP
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = Math.floor(100000 + Math.random() * 900000).toString();
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// signup

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // 1️⃣ Validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Passwords didn't match",
      });
    }

    // 3️⃣ Check if user already exists
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    // 4️⃣ Fetch most recent OTP for this email
    const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOTP) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    console.log("Recent OTP:", recentOTP.otp);

    // 5️⃣ Compare OTP
    if (otp !== recentOTP.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP didn't match",
      });
    }

    // 6️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7️⃣ Create Profile
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber || null,
    });

    // 8️⃣ Create User entry
    const user = await USER.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetail: profileDetails._id,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // 9️⃣ Success response
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};


// login

exports.login = async (req,res) => {
    try{
        const {email , password} = req.body ;

        if(!email || !password){
            return res.status(403).json({
                success : false,
                message : 'Enter corect details'
            });
        }

        const user = await USER.findOne({email}).populate("additionalDetail");

        if(!user){
            return res.status(400).json({
                success : false,
                message : 'Please SignUp first'
            });
        }

        if(await bcrypt.compare(password,user.password)){
            // create token by sign method
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET ,{
                expiresIn : "24h"
            });

            user.token = token,
            user.password = undefined

            // generate cookies

            const options = {
                expiresIn : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true
            }

            res.cookie("token",token,options).status(200).json({
                success : true,
                token,
                user,
                message : 'Logged in successfully'
            });
        }
        else{
            return res.status(401).json({
                success : false,
                messagec : 'Password is inccorrect'
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            messagec : 'Login failed, Try Again'
        });
    }
}

// change password

exports.changePassword = async (req, res) => {
    try {
        const userDetail = await USER.findById(req.user.id);
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // Validate old password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, userDetail.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                success: false,
                message: 'Old password is incorrect'
            });
        }

        // Validate new password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match'
            });
        }

        // Update password in DB
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await USER.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        // Send email notification
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT || 587,
                secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: `"Study-Notion" <${process.env.MAIL_USER}>`,
                to: updatedUser.email,
                subject: 'Password Updated Successfully',
                html: `<p>Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}</p>`,
            });

        } catch (emailError) {
            console.log('Error sending email:', emailError);
            // You might still want to succeed even if email fails
        }

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.log('Change password error:', error);
        return res.status(500).json({
            success: false,
            message: "Password can't be changed"
        });
    }
};

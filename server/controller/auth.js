const USER = require("../model/user");
const OTP = require("../model/otp");
const otpGenerator = require("otp-generator");
const Profile = require("../model/profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { ClientSession } = require("mongodb");
require("dotenv").config();
const mailSender = require("../util/mailSender");

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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user
    const user = await USER.findOne({ email }).populate("additionalDetail");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // 3️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // 4️⃣ Create JWT payload (IMPORTANT: id MUST be included)
    const payload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    // 5️⃣ Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Remove password before sending user
    user.password = undefined;

    // 6️⃣ Cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure cookie in prod
      sameSite: "strict",
    };

    // 7️⃣ Send success response
    return res
      .status(200)
      .cookie("token", token, options)
      .json({
        success: true,
        message: "Logged in successfully",
        token,
        user,
      });

  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};


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


// update password 

exports.updatePassword = async (req, res) => {
  try {
    const userID = req.user.id;
    const { oldPassword ,newPassword } = req.body;

    const userDetails = await USER.findById(userID);
    console.log(userDetails);

    if(!userDetails){
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, userDetails.password);

    if(!isPasswordCorrect){
      return res.status(403).json({
        success: false,
        message: "Old password is incorrect"
      });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await USER.findByIdAndUpdate(
      userID,
      { password: encryptedPassword },
      { new: true }
    );

    // send notification email of password update

    try {
      const emailResponse = await mailSender(
        updatedUser.email,
        'Password Updated Successfully',
        `<p>Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}</p>`
      )
      console.log("Email for password update send successfully", userDetails.email)
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in sending email in password update"
      });
    }

    return res.status(200).json({
      success : true,
      message : "Password updated successfully"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Password can't be updated"
    });
  }
}
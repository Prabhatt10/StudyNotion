const USER = require("../model/user");
const mailSender = require("../util/mailSender");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Generate reset password token
exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await USER.findOne({email: email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email`
            });
        }

        const token = crypto.randomBytes(20).toString("hex");
        const updatedDetails = await USER.findOneAndUpdate(
            {email: email },
            {
                token : token, 
                resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
            { new: true }
        );

        const url = `http://localhost:5173/updatePassword/${token}`;
        await mailSender(email, "Password reset link", `Your Link for email verification is ${url}. Please click this url to reset your password.`);

        // console.log("token is : " , token);

        return res.status(200).json({
            success: true,
            message: 'Password reset link sent successfully, check your email'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Password reset link cannot be sent, please try again'
        });
    }
}

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;
        if(password !== confirmPassword){
            return res.status(403).json({
                success : false,
                message : "Password and Confirm Password Does not Match"
            })
        }
        const userDetails = await USER.findOne({token : token });
        if (!userDetails) {
            return res.status(403).json({
                success: false,
                message: 'Token is invalid'
            });
        }

        console.log(userDetails)

        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(403).json({
                success: false,
                message: 'URL expired, regenerate your token'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await USER.findOneAndUpdate(
            {token : token },
            { 
                password: hashedPassword,
                token: null, 
                resetPasswordExpires: null
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Password reset successful'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Password cannot be reset, please try again'
        });
    }
}
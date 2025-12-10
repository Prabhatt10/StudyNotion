const USER = require("../model/user");
const PROFILE = require("../model/profile");
const COURSE = require("../model/course");
const { imageUploadToCloudinary } = require("../util/imageUploader");
const dotenv = require("dotenv");
dotenv.config();


// Update Profile
// exports.updateProfile = async (req, res) => {
//     try {
//         const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
//         const userID = req.user.id;

//         // Validation
//         if (!contactNumber || !gender || !userID) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             });
//         }

//         // Find user and profile
//         const userDetails = await USER.findById(userID);
//         if (!userDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         const profileID = userDetails.additionalDetail;
//         const profileDetails = await PROFILE.findById(profileID);

//         if (!profileDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Profile not found"
//             });
//         }

//         // Update profile fields
//         profileDetails.dateOfBirth = dateOfBirth;
//         profileDetails.about = about;
//         profileDetails.contactNumber = contactNumber;
//         profileDetails.gender = gender;

//         await profileDetails.save();

//         return res.status(200).json({
//             success: true,
//             message: "Profile Updated Successfully",
//             profileDetails
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Profile cannot be updated"
//         });
//     }
// };


exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const userID = req.user.id;

    if (!contactNumber || !gender || !userID) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const userDetails = await USER.findById(userID);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const profileID = userDetails.additionalDetail;
    const profileDetails = await PROFILE.findById(profileID);

    if (!profileDetails) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;

    await profileDetails.save();

    // Return complete updated user
    const updatedUser = await USER.findById(userID)
      .populate("additionalDetail")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updatedUserDetails: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Profile cannot be updated"
    });
  }
};


// Delete Profile
exports.deleteProfile = async (req, res) => {
    try {
        const userID = req.user.id;

        // Find user
        const userDetails = await USER.findById(userID);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Delete profile
        await PROFILE.findByIdAndDelete(userDetails.additionalDetail);

        // Unenroll user from all courses
        for (const courseID of userDetails.courses) {
            await COURSE.findByIdAndUpdate(
                courseID,
                { $pull: { studentsEnrolled: userID } },
                { new: true }
            );
        }

        // Delete user
        await USER.findByIdAndDelete(userID);

        return res.status(200).json({
            success: true,
            message: "Profile and account deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Profile cannot be deleted, please try again later"
        });
    }
};

// Get All User Details
exports.getAllUserDetails = async (req, res) => {
    try {
        const userID = req.user.id;
        const userDetails = await USER.findById(userID).populate("additionalDetail").exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully fetched user details",
            data: userDetails
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch user details"
        });
    }
};


exports.updateDisplayPicture = async (req,res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userID = req.user.id;
        if(!displayPicture){
            return res.status(400).json({
                success : false,
                message : 'Display Picture is required'
            });
        }
        
        const uploadedImage = await imageUploadToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        console.log(uploadedImage);

        const updatedProfilePicture = await USER.findByIdAndUpdate(
            { _id : userID},
            {image : uploadedImage.secure_url},
            {new : true}
        )

        return res.status(200).json({
            success : true,
            message : 'Display Picture updated successfully',
            data : updatedProfilePicture
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : 'Display Picture cannot be updated',
        });
    }
}
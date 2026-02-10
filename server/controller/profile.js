const USER = require("../model/user");
const PROFILE = require("../model/profile");
const COURSE = require("../model/course");
const COURSE_PROGRESS = require("../model/courseprogress");
const { imageUploadToCloudinary } = require("../util/imageUploader");
const dotenv = require("dotenv");
dotenv.config();
const { convertSecondsToDuration} = require('../util/secToDuration');
const course = require("../model/course");

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

// Get User Enrolled Courses
exports.getUserEnrolledCourses = async (req, res) => {
    try {
        const userID = req.user.id;
        let userDetails = await USER.findById(userID)
        .populate({
            path: 'courses',
            populate : {
                path : 'courseContent',
                populate : {
                    path : 'subSection'
                }
            }
        }) .exec();
        userDetails = userDetails.toObject();

        var subSectionLength = 0;
        for(var i=0;i<userDetails.courses.length;i++){
            let totalDurationInSeconds = 0;
            subSectionLength = 0;
            for(var j=0;j<userDetails.courses[i].courseContent.length;j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[j]
                .subSection.reduce((acc,curr) => acc + parseInt(curr.timeDuration),0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await COURSE_PROGRESS.findOne({
                courseID : userDetails.courses[i]._id,
                userID : userID
            })
            courseProgressCount = courseProgressCount?.completedvideos.length
            if(subSectionLength === 0){
                userDetails.courses[i].progressPercentage = 100
            } else {
                const multiplier = Math.pow(10,2)
                userDetails.courses[i].progressPercentage = Math.round(
                    ((courseProgressCount / subSectionLength) * 100 * multiplier) / multiplier
                )
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            });
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Unable to fetch enrolled courses'
        })
    }
}

// Get insructor Details
exports.instructorDashboard = async (req,res) => {
    try {
        const userID = req.user.id;
        const courseDetails = await COURSE.findById({instructor : userID});

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.updatedProfilePicture
            const courseDataWithStatics = {
                _id : course._id,
                courseName : course.courseName,
                courseDescription : course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDetails
        })
        return res.status(200).json({
            success : true,
            message: "Data Fetched successfully",
            courses : courseData
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Can't Fetch Instructor Details"
        })
    }
}
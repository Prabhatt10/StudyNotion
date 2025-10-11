const COURSE = require("../model/course");
const CATEGORY = require("../model/category");
const USER = require("../model/user");
const {imageUploadToCloudinary} = require("../util/imageUploader");
const { useInsertionEffect } = require("react");
require("dotenv").config();

// create course

exports.createCourse = async (req, res) => {
    try {
        const userID = req.user.id;

        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag: _tag,
            category,
            status,
            instructions: _instructions,
        } = req.body;

        const thumbnail = req.files?.thumbnailImage;

        // Parse tags and instructions safely
        let tag = [];
        let instructions = [];

        try {
            tag = _tag ? (typeof _tag === "string" ? JSON.parse(_tag) : _tag) : [];
        } catch {
            tag = [_tag];
        }

        try {
            instructions = _instructions
                ? typeof _instructions === "string"
                    ? JSON.parse(_instructions)
                    : _instructions
                : [];
        } catch {
            instructions = [_instructions];
        }

        console.log("tag : ", tag);
        console.log("instructions : ", instructions);

        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag.length ||
            !thumbnail ||
            !category ||
            !instructions.length
        ) {
            return res.status(400).json({
                success: false,
                message: "Instructor Details not found",
            });
        }

        const instructorDetails = await USER.findById(userID);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }

        const categoryDetails = await CATEGORY.findById(category);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details not found",
            });
        }

        const thumbnailImage = await imageUploadToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        console.log(thumbnailImage);

        const newCourse = await COURSE.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status,
            instructions,
        });

        await USER.findByIdAndUpdate(
            instructorDetails._id,
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        await CATEGORY.findByIdAndUpdate(
            category,
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        console.log("Category Details : ", categoryDetails);

        return res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create course",
        });
    }
};


exports.getAllCourse = async (req,res) => {
    try{
        const allCourses = await COURSE.find({}, {
                                                courseName: true,
                                                price: true,
                                                thumbnail: true,
                                                instructor: true,
                                                ratingAndReview: true,
                                                studentsEnrolled: true
                                            }).populate("instructor");

    
        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            allCourses
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'cannot get all courses, Please try again'
        });
    }
}

// get all content of the course

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseID } = req.body;

        const courseDetails = await COURSE.findById(courseID)
            .populate({
                path: "instructor",
                populate: { path: "additionalDetail" }
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: { path: "sub" }
            })
            .exec();

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find the course with ID ${courseID}`
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// update Course

exports.updateCourse = async (req, res) => {
    try {
        const { courseID, courseName, courseDescription, whatYouWillLearn, price, tags } = req.body;
        const course = await COURSE.findById(courseID);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Update thumbnail if new file is uploaded
        if (req.files && req.files.thumbnailImage) {
            const thumbnailImage = await imageUploadToCloudinary(req.files.thumbnailImage, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

        // Update other fields if provided
        course.courseName = courseName || course.courseName;
        course.courseDescription = courseDescription || course.courseDescription;
        course.whatYouWillLearn = whatYouWillLearn || course.whatYouWillLearn;
        course.price = price || course.price;

        // Update tag if provided
        if (tags) {
            const tagDetails = await TAGS.findById(tags);
            if (!tagDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'TAG not found'
                });
            }
            course.tags = tagDetails._id;
        }

        await course.save();

        return res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: course
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error updating course'
        });
    }
}

// Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseID } = req.body;
        const course = await COURSE.findById(courseID);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Remove course reference from instructor
        await USER.findByIdAndUpdate(course.instructor, {
            $pull: { courses: course._id }
        });

        // Remove course reference from tags
        await TAGS.findByIdAndUpdate(course.tags, {
            $pull: { courses: course._id }
        });

        // Delete the course itself
        await COURSE.findByIdAndDelete(courseID);

        return res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error deleting course'
        });
    }
}


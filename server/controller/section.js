// const SECTION = require("../model/section");
// const COURSE = require("../model/course");


// // create section
// exports.createSection = async (req,res) => {
//     try{
//         // data fetch
//         const {sectionName , courseID} = req.body;
//         // data validation
//         if(!sectionName || !courseID){
//             return res.status(400).json({
//                 success : false,
//                 message : 'All fileds are required'
//             });
//         }
//         // create section
//         const newSection = await SECTION.create({sectionName});
//         // update course with section objectID
//         const updatedCourseDetails = await COURSE.findByIdAndUpdate(
//             courseID,
//             {
//                 $push : {
//                     courseContent : newSection._id,
//                 }
//             },
//             {new:true}
//         ).populate({
//             path : "courseContent",
//             populate : {
//                 path : "subSection"
//             }
//         });

//         res.status(200).json({
// 			success: true,
// 			message: "Section created successfully",
// 			updatedCourseDetails,
// 		});
//     }
//     catch (error) {
//         console.error("Create Section Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }

// // update section
// exports.updateSection = async (req,res) => {
//     try{
//         // fetch data
//         const {sectionName,sectionID} = req.body;
//         // validate 
//         if(!sectionID || !sectionName){
//             return res.status(400).json({
//                 success : false,
//                 message : "all fields required"
//             });
//         }
//         // update data
//         const updatedSection = await SECTION.findByIdAndUpdate(
//             sectionID,
//             {sectionName},
//             {new:true}
//         )
//         // return response
//         res.status(200).json({
// 			success: true,
// 			message: "Section updated successfully",
// 			updatedSection,
// 		});

//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success : false,
//             message : "Error in updating section"
//         });
//     }
// }

// // delete section
// exports.deleteSection = async (req,res) => {
//     try {
//         // get id
//         const {sectionID} = req.params;
//         // validation
//         if(!sectionID){
//             return res.status(400).json({
//                success : false,
//                 message : 'All fileds are required'
//             });
//         }
//         // find by id and delete
//         await SECTION.findByIdAndDelete(sectionID);
//         // return  res
//         return res.status(200).json({
//             succes : true,
//             message : 'Section updated successfully'
//         });

//     } catch(error) {
//         console.log(error);
//         return res.status(500).json({
//             success : false,
//             message : "Error in deleting section"
//         });
//     }
// }


const SECTION = require("../model/section");
const COURSE = require("../model/course");

// ====================== CREATE SECTION ======================
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseID } = req.body;

    if (!sectionName || !courseID) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create section
    const newSection = await SECTION.create({ sectionName });

    // Add section to course
    const updatedCourseDetails = await COURSE.findByIdAndUpdate(
      courseID,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error creating section",
    });
  }
};

// ====================== UPDATE SECTION ======================
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await SECTION.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error updating section",
    });
  }
};

// ====================== DELETE SECTION ======================
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Remove section from course
    await COURSE.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });

    // Delete section
    await SECTION.findByIdAndDelete(sectionId);

    // Return updated course
    const updatedCourse = await COURSE.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error deleting section",
    });
  }
};
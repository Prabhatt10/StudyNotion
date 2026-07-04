const SUBSECTION = require("../model/subSection");
const SECTION = require("../model/section");
const { videoUploadToCloudinary } = require("../util/imageUploader");


// create subsection
exports.createSubSection = async (req,res) => {
    try{
        // fetch data
        console.log("----- Create Subsection Called -----")
        const { sectionId, title, description, timeDuration } = req.body;
        const video = req.files?.video;
        console.log("Body:", req.body);
        console.log("Files:", req.files);
        // validate 
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success : false,
                message : 'all fields are required'
            });
        }
        // upload video in cloudinary
        const uploadDetail = await videoUploadToCloudinary(video, process.env.FOLDER_NAME);
        // create subsection
        const updatedSubSection = await SUBSECTION.create({
            title : title,
            timeDuration : timeDuration,
            description : description,
            videoUrl : uploadDetail.secure_url
        });
        // update subsection in section
        const updatedSection = await SECTION.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: updatedSubSection._id
                }
            },
            { new: true }
        ).populate ("subSection");

        // return response
        return res.status(200).json({
            success : true,
            message : 'subSection created successfully',
            data : updatedSection
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Error in creating Subsection',
        });
    }
}

// update sub section
exports.updateSubSection = async (req,res) => {
    try{

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Error in updating Subsection'
        });
    }
}

// delete sub section
// delete sub section
exports.deleteSubSection = async (req, res) => {
    try {
        // fetch data
        const { subSectionId, sectionId } = req.body;

        // validate
        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // remove subsection from section
        const updatedSection = await SECTION.findByIdAndUpdate(
            sectionId,
            {
                $pull: {
                    subSection: subSectionId,
                },
            },
            { new: true }
        ).populate("subSection");

        // delete subsection document
        await SUBSECTION.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
            data: updatedSection,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting SubSection",
        });
    }
}
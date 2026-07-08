const SUBSECTION = require("../model/subSection");
const SECTION = require("../model/section");
const { videoUploadToCloudinary } = require("../util/imageUploader");

// ========================= CREATE SUBSECTION =========================
exports.createSubSection = async (req, res) => {
    try {
        console.log("----- Create Subsection Called -----");

        const { sectionId, title, description, timeDuration } = req.body;
        const video = req.files?.video;

        if (!sectionId || !title || !description || !timeDuration || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Upload video
        const uploadDetails = await videoUploadToCloudinary(
            video,
            process.env.FOLDER_NAME
        );

        // Create subsection
        const newSubSection = await SUBSECTION.create({
            title,
            description,
            timeDuration,
            videoUrl: uploadDetails.secure_url,
        });

        // Add subsection to section
        const updatedSection = await SECTION.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: newSubSection._id,
                },
            },
            { new: true }
        ).populate("subSection");

        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            data: updatedSection,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error while creating SubSection",
        });
    }
};

// ========================= UPDATE SUBSECTION =========================
exports.updateSubSection = async (req, res) => {
    try {
        const {
            sectionId,
            subSectionId,
            title,
            description,
            timeDuration,
        } = req.body;

        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Section ID and SubSection ID are required",
            });
        }

        const subSection = await SUBSECTION.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // Update text fields
        if (title) {
            subSection.title = title;
        }

        if (description) {
            subSection.description = description;
        }

        if (timeDuration) {
            subSection.timeDuration = timeDuration;
        }

        // Update video (optional)
        if (req.files && req.files.video) {
            const video = req.files.video;

            const uploadDetails = await videoUploadToCloudinary(
                video,
                process.env.FOLDER_NAME
            );

            subSection.videoUrl = uploadDetails.secure_url;

            if (uploadDetails.duration) {
                subSection.timeDuration = uploadDetails.duration.toString();
            }
        }

        await subSection.save();

        const updatedSection = await SECTION.findById(sectionId).populate(
            "subSection"
        );

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedSection,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error while updating SubSection",
        });
    }
};

// ========================= DELETE SUBSECTION =========================
exports.deleteSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId } = req.body;

        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Section ID and SubSection ID are required",
            });
        }

        // Remove subsection reference from section
        const updatedSection = await SECTION.findByIdAndUpdate(
            sectionId,
            {
                $pull: {
                    subSection: subSectionId,
                },
            },
            { new: true }
        ).populate("subSection");

        // Delete subsection document
        const deletedSubSection = await SUBSECTION.findByIdAndDelete(
            subSectionId
        );

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedSection,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error while deleting SubSection",
        });
    }
};
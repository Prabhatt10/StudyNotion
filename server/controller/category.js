const CATEGORY = require("../model/category");

// create CATEGORY  handler function

exports.createCategory = async (req,res) => {
    try {
        // fetch data
        const {name,description} = req.body;
        // validation
        if(!name || !description){
            return res.status(403).json({
                success : false,
                message : 'All fields are required'
            });
        }
        // create entry in DB
        const categoryDetails = await CATEGORY.create({
            name : name,
            description : description
        });
        // return response
        return res.status(200).json({
            success : true,
            message : 'CATEGORY created Successfully'
        });
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Error in creating CATEGORY'
        });
    }
}

// get all CATEGORY handler function
exports.getAllCategory = async (req,res) => {
    try{
        const allTags = await CATEGORY.find({} , {name:true,description:true});
        return res.status(200).json({
            success : true,
            message : 'All CATEGORY returned successfully',
            allTags
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Error in getting all CATEGORY'
        });
    }
}


exports.categoryPageDetails = async (req, res) => {
    try {
        // get category id
        const { categoryID } = req.body;

        // get courses for specified category ID
        const selectedCategory = await CATEGORY.findById(categoryID)
            .populate("courses")
            .exec();

        // validation
        if (!selectedCategory) {
            return res.status(403).json({
                success: false,
                message: 'Selected category is not present'
            });
        }

        // get courses from different categories
        const differentCategory = await CATEGORY.find({ _id: { $ne: categoryID } })
            .populate("courses")
            .exec();

        // get top selling courses
        const allCategories = await CATEGORY.find()
            .populate({
                path: "courses",
                match: { status: "published" },
                populate: { path: "instructor" }
            })
            .exec();

        const allCourses = allCategories.flatMap(category => category.courses);
        const mostSelling = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        // return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSelling
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting category page details'
        });
    }
}

const categoryModel = require("../model/categoryModel")

module.exports.addCategory = (async (request, response) => {
    try {
        if (request.user.role === "admin") {
            const exist = await categoryModel.findOne({ categoryName: request.body.categoryName });
            if (exist) {
                response.status(404).json({
                    message: "Category already exist.",
                    data: "Category already exist."
                })
            } else {
                request.body.userId = request.user._id;
                const category = await categoryModel.create(request.body);
                if (category) {
                    response.status(200).json({
                        message: "Category added successfully.",
                        data: category
                    })
                } else {
                    response.status(404).json({
                        message: "Category not added.",
                        data: category
                    })
                }
            }
        } else {
            response.status(404).json({
                message: "Only admin can add category.",
                data: "Invalid user."
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while adding category.",
            data: error
        })
    }
})

module.exports.addSubCategory = (async (request, response) => {
    try {
        if (request.user.role === "admin") {
            const category = await categoryModel.create(request.body);
            if (category) {
                response.status(200).json({
                    message: "Category added successfully.",
                    data: category
                })
            } else {
                response.status(404).json({
                    message: "Category not added.",
                    data: category
                })
            }
        }
        else {
            response.status(404).json({
                message: "Only admin can add category.",
                data: "Invalid user."
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while adding category.",
            data: error
        })
    }
})

module.exports.getCategory = (async (request, response) => {
    try {
        const categories = await categoryModel.find();
        if (categories.length !== 0 && categories) {
            response.status(200).json({
                message: "Category retrived successfully.",
                data: categories
            })
        } else {
            response.status(200).json({
                message: "No category found.",
                data: categories
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while retriving category.",
            data: error
        })
    }
})

module.exports.deleteCategory = (async (request, response) => {
    try {
        const id = request.params.id;
        const categories = await categoryModel.findById(id);
        if (categories.length !== 0 && categories) {
            const categories = await categoryModel.findByIdAndDelete(id);
            response.status(200).json({
                message: "Category Deleted successfully.",
                data: categories
            })
        } else {
            response.status(200).json({
                message: "No category found.",
                data: categories
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while deleting category.",
            data: error
        })
    }
})
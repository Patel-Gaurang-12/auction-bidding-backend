const subCategoryModel = require("../model/subCategoryModel")

const addSubCategory = (async (request, response) => {
    try {
        const subCategory = await subCategoryModel.create(request.body)
        if (subCategory) {
            response.status(200).json({
                message: "Sub ategory added successfully.",
                data: subCategory
            })
        } else {
            response.status(404).json({
                message: "Sub sategory not added.",
                data: subCategory
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while adding sub category.",
            data: []
        })
    }
})

const getAllCategory = (async (request, response) => {
    try {
        const subCategory = await subCategoryModel.find({}).populate("categoryId").exec();
        if (subCategory) {
            response.status(200).json({
                message: "Sub category added successfully.",
                data: subCategory
            })
        } else {
            response.status(404).json({
                message: "Sub category not added.",
                data: []
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while adding sub category.",
            data: error
        })
    }
})

const getSubCategoryByCategory = (async (request, response) => {
    try {
        const subCategory = await subCategoryModel.find({ categoryId: request.params.id }).populate("categoryId").exec();
        if (subCategory) {
            response.status(200).json({
                message: "Sub category retrived successfully.",
                data: subCategory
            })
        } else {
            response.status(404).json({
                message: "Error while retriving sub category.",
                data: []
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while retriving sub category.",
            data: error
        })
    }
})

const deleteSubCategory = (async (request, response) => {
    try {
        const subCategory = await subCategoryModel.findByIdAndDelete(request.params.id);
        if (subCategory) {
            response.status(200).json({
                message: "Sub category deleted successfully.",
                data: subCategory
            })
        } else {
            response.status(404).json({
                message: "Error while deleting sub category.",
                data: []
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while deleting sub category.",
            data: error
        })
    }
})

module.exports = {
    addSubCategory,
    getAllCategory,
    getSubCategoryByCategory,
    deleteSubCategory
}
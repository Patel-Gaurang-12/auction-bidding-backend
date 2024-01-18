const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subCategory: {
        type: String,
        require: [true, "Sub category is required.."]
    },
})

module.exports = mongoose.model("subCategory", subCategorySchema)
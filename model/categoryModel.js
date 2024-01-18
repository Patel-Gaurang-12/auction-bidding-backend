const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Category is required"],
        unique: {
            value: true,
            message: "Category already exist."
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required."]
    }
})

module.exports = mongoose.model("category", categorySchema)
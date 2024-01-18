const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."]
    },
    subTitle: {
        type: String
    },
    description: {
        type: String,
        required: [true, "Description is required."]
    },
    reservePrice: {
        type: Number,
        required: [true, "Reserve price is required."]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User ID is required.']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'Category id is required.']
    },
    subCategory : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory',
        required: [true, 'Sub category id is required.']
    },
    status: {
        type: String,
        enum: [
            "pending",
            "live",
            "closed",
            "rejected"
        ],
        required: [true, 'Status is required.']
    },
    endDate: {
        type: Date,
        required: [true, 'End Date is required.']
    },
    images: [
        {
            type: String,
            required: [true, "Images is required."]
        }
    ]
})

module.exports = mongoose.model("product", productSchema)
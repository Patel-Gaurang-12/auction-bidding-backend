const mongoose = require("mongoose")

const bidSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: [true, "Product id is required."]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "User id is required."]
    },
    amount: {
        type: Number,
        required: [true, "amount is required."]
    },
    date: {
        type: Date,
        required: [true, "Date is required."]
    }
})

module.exports = mongoose.model('bid', bidSchema)
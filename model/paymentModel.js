const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User id is required."]
    },
    accountNumber: {
        type: String,
        required: [true, "Account number is required."]
    },
    hodlerName: {
        type: String,
        required: [true, "Card holder name is required."]
    },
    cvv: {
        type: String,
        required: [true, "CVV is required."]
    },
    address: {
        type: String,
        required: [true, "Address is required."]
    },
    city: {
        type: String,
        required: [true, "City is required."]
    },
    pincode: {
        type: String,
        required: [true, "Pin code name is required."]
    },
    state: {
        type: String,
        required: [true, "State name is required."]
    },
    country: {
        type: String,
        required: [true, "Country name is required."]
    }
})

module.exports = mongoose.model("payment", paymentSchema)
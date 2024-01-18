const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    userName: {
        type: String,
        unique: {
            value: true,
            message: "User name should be unique."
        },
        required: [true, "User name is rquired."]
    },
    contactNumber: {
        type: Number,
        unique: {
            value: true,
            message: "Contact number should be unique."
        },
        required: [true, "Contact number is rquired."]
    },
    firstName: {
        type: String,
        required: [true, "First name is rquired."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is rquired."]
    },
    email: {
        type: String,
        unique: [true, "Email should be unique."],
        required: [true, "Email is rquired."]
    },
    password: {
        type: String,
        required: [true, "Password is rquired."]
    },
    role: {
        type: String,
        enum: [
            "admin",
            "seller",
            "buyer"
        ],
        required: [true, "Role is rquired."]
    },
    profileUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    win: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
            },
            isPaid: {
                type: Boolean,
                default: false,
            },
            winAmount: {
                type: Number,
                default: 0
            }
        }
    ]
})

module.exports = mongoose.model("user", userShema);
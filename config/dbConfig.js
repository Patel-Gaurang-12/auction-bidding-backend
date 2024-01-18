const mongoose = require("mongoose")

module.exports.dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/auction")
        console.log("db connected.");
    } catch (error) {
        console.log(error);
        console.log("Error while connecting db.");
    }
}
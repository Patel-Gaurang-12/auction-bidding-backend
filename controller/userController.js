const userModel = require("../model/userModel")
const passwordUtil = require("../util/passwordUtil")
const jwtUtil = require("../util/jwtUtil")
const productController = require('./productController')
const authMailUtil = require("../util/authMailUtil")

module.exports.register = (async (request, response) => {
    try {
        const validataion = await userModel.find({
            $or: [
                { email: request.body.email },
                { contactNumber: request.body.contactNumber },
                { userName: request.body.userName },
            ]
        }, { email: 1, contactNumber: 1, userName: 1, _id: 0 });
        if (validataion.length === 0) {
            request.body.password = await passwordUtil.encryptPassword(request.body.password);
            var user = await userModel.create(request.body);
            const token = await jwtUtil.generageToken(user);
            const data = { ...user };
            delete data._doc.password;
            response.status(200).json({
                message: "user added successfully",
                data: data._doc,
                token: token
            })
        } else {
            response.status(404).json({
                message: "Enter unique value"
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while adding user",
            data: error
        })
    }
})

module.exports.login = (async (request, response) => {
    try {
        const user = await userModel.findOne({ email: request.body.email })
        if (user) {
            const flag = await passwordUtil.comparePassword(request.body.password, user.password);
            if (flag) {
                const token = await jwtUtil.generageToken(user);
                var data = { ...user };
                delete data._doc.password;
                const pin = await authMailUtil.sendMail(data._doc.email);
                response.status(200).json({
                    message: "Login success.",
                    data: data._doc,
                    token: token,
                    pin: pin
                })
            } else {
                response.status(401).json({
                    message: "Invalid credential.",
                    data: ""
                })
            }
        } else {
            response.status(404).json({
                message: "user not found.",
                data: ""
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while login user",
            data: error
        })
    }
})

module.exports.getProfile = (async (request, response) => {
    try {
        // var user = { ...request.user };
        // delete user.password;
        const user = await userModel.findById(request.user._id).populate("win.productId");
        response.status(200).json({
            message: "User profile retrived successfully.",
            data: user
        })
    } catch (error) {
        response.status(404).json({
            message: "Error while retriving user's profile.",
            data: error
        })
    }
})

module.exports.getAllUser = (async (request, response) => {
    try {
        const users = await userModel.find().populate("win.productId");

        if (users.length > 0) {
            response.status(200).json({
                message: "user retrived successfully.",
                data: users
            })
        } else {
            throw new Error("No user found..")
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while retriving users.",
            data: error
        })
    }
})

module.exports.getUserById = (async (id) => {
    try {
        const user = await userModel.findById(id);
        delete user.password;
        return user;
    } catch (error) {
        throw new Error(error)
    }
})

module.exports.deleteUser = (async (request, response) => {
    try {
        const users = await userModel.findById(request.params.id);
        if (users) {
            const deletedUser = await userModel.findByIdAndDelete(request.params.id);
            if (deletedUser) {
                response.status(200).json({
                    message: "user deleted successfully.",
                    data: users
                })
            } else {
                response.status(404).json({
                    message: "Error while Deleting users.",
                    data: []
                })
            }
        } else {
            response.status(404).json({
                message: "user not found successfully.",
                data: []
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while Deleting users.",
            data: error
        })
    }
})
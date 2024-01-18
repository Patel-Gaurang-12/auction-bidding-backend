const paymentModel = require("../model/paymentModel");
const userModel = require("../model/userModel")

module.exports.addPaymentAddressDetails = (async (request, response) => {
    try {
        request.body.userId = request.user._id;
        const data = {
            userId: request.user._id,
            accountNumber: request.body.accountNumber,
            hodlerName: request.body.hodlerName,
            cvv: request.body.cvv,
            address: request.body.address,
            city: request.body.city,
            pincode: request.body.pincode,
            state: request.body.state,
            country: request.body.country
        }
        const payment = await paymentModel.create(data);
        if (payment) {
            response.status(200).json({
                message: "payment add success.",
                data: payment,
            })
        } else {
            response.status(404).json({
                message: "Payment not added.",
                data: [],
            })
        }
    } catch (error) {
        console.log(error);
        response.status(404).json({
            message: "Error while adding payment.",
            data: []
        })
    }
})

module.exports.getAllPaymentAddressDetails = (async (request, response) => {
    try {
        const data = await paymentModel.find({ userId: request.user._id }).populate("userId").exec();
        if (data) {
            response.status(200).json({
                message: "data retrived success.",
                data: data,
            })
        } else {
            response.status(404).json({
                message: "No data available.",
                data: [],
            })
        }
    } catch (error) {
        console.log(error);
        response.status(404).json({
            message: "Error while retriving data.",
            data: []
        })
    }
})

module.exports.updateProductToPaid = (async (request, response) => {
    try {
        const userUpdate = await userModel.updateOne(
            { _id: request.user._id, 'win.productId': request.body.productId },
            { $set: { 'win.$.isPaid': true } }
        )
        if (userUpdate) {
            response.status(200).json({
                message: "Payment success.",
                data: userUpdate,
            })
        } else {
            response.status(404).json({
                message: "Error while payment.",
                data: [],
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while payment.",
            data: [],
        })
    }
})
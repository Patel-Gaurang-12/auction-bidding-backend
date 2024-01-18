const bidModel = require("../model/bidModel")

module.exports.addBid = (async (request, response) => {
    try {
        if (request.user.role === "buyer") {
            request.body.userId = request.user._id;
            request.body.date = new Date().toLocaleDateString()
            const bid = await bidModel.create(request.body)
            if (bid) {
                response.status(200).json({
                    message: "Bid added successfully.",
                    data: bid
                })
            } else {
                response.status(404).json({
                    message: "Bid not added.",
                    data: error
                })
            }
        } else {
            response.status(404).json({
                message: "Only buyer can bid.",
                data: "Only buyer can bid"
            })
        }
    } catch (error) {
        console.log(error);
        response.status(404).json({
            message: "Error while adding bids.",
            data: error
        })
    }
})

module.exports.getBids = (async (request, response) => {
    try {
        request.body.userId = request.user._id;
        const bids = await bidModel.find({ productId: request.params.id }, {}).populate("userId").sort({ amount: -1 }).limit(10);
        if (bids) {
            response.status(200).json({
                message: "Bid retrived successfully.",
                data: bids
            })
        } else {
            response.status(200).json({
                message: "No any bid placed yet.",
                data: bids
            })
        }
    } catch (error) {

    }
})
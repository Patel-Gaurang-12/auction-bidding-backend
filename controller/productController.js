const productModel = require("../model/productModel")
const userController = require("./userController")
const pictureUtils = require("../util/pictureUtil")

module.exports.addProduct = (async (request, response) => {
    try {
        const user = await userController.getUserById(request.user._id);
        if (user.role === "seller" || user.role === "admin") {
            request.body.data = JSON.parse(request.body.data);
            request.body.data.userId = user._id;
            request.body.data.status = "pending";
            const imgs = await pictureUtils.uploadPicture(request.files);
            const imageUrls = []
            imgs.forEach(element => {
                imageUrls.push(element.url)
            });
            request.body.data.images = imageUrls
            const preProduct = {
                userId: user._id,
                status: "pending",
                categoryId: request.body.categoryId,
                subTitle: request.body.subTitle,
                description: request.body.description,
                subCategory: request.body.subCategory,
                title: request.body.title,
                endDate: request.body.endDate,
                reservePrice: request.body.reservePrice,
                images: imageUrls
            }
            const product = await productModel.create(request.body.data);
            response.status(200).json({
                message: "Product added successfully.",
                data: product
            })
        } else {
            response.status(404).json({
                message: "only seller and admin can add product."
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while adding product.",
            data: error
        })
    }
})

module.exports.getAllProduct = (async (request, response) => {
    try {
        var products = await productModel.find({});
        if (products !== undefined && products.length !== 0 && products) {
            const data = products.map(element => {
                element.images = element.images.map(img => encodeURI(img))
                return element
            })
            response.status(200).json({
                message: "Product retrived successfully.",
                data: products
            })
        }
        else {
            response.status(200).json({
                message: "Product retrived successfully.",
                data: []
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while retriving product.",
            data: error
        })
    }
})

module.exports.getProductsByUser = (async (request, response) => {
    try {
        const product = await productModel.findById(request.params.id).populate("categoryId").populate("userId");
        if (product !== undefined && product) {
            response.status(200).json({
                message: "Products retrived successfully.",
                data: product
            })
        } else {
            response.status(200).json({
                message: "No product available.",
                data: []
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while retriving product.",
            data: error
        })
    }
})


module.exports.updateProductStatus = (async (request, response) => {
    try {
        const product = await productModel.findById(request.params.id);
        if (product !== undefined && product) {
            const update = await productModel.findByIdAndUpdate(product._id, { status: request.body.status }, { new: true });
            if (update) {
                response.status(200).json({
                    message: "Products updated successfully.",
                    data: update
                })
            } else {
                response.status(500).json({
                    message: "Error while updating product.",
                    data: update
                })
            }
        } else {
            response.status(404).json({
                message: "No product available.",
                data: []
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while retriving product.",
            data: error
        })
    }
})

module.exports.getAllProductByUser = (async (request, response) => {
    try {
        const product = await productModel.find({ userId: request.params.id }).populate("categoryId").populate("userId");
        if (product !== undefined && product) {
            response.status(200).json({
                message: "Products retrived successfully.",
                data: product
            })
        } else {
            response.status(200).json({
                message: "No product available.",
                data: []
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Error while retriving product.",
            data: error
        })
    }
})

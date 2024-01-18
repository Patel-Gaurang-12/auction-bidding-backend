const { imagekit } = require("../config/environment.config.js");

module.exports.uploadController = async (request, response) => {
    try {
        const file = request.file;
        const image = await imagekit.upload({
            file: file?.buffer,
            fileName: file?.originalname,
        });
        response.status(200).json({
            message: "image stored successfully.",
            data: image
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Error while storing image.",
            data: error
        })
    }
}

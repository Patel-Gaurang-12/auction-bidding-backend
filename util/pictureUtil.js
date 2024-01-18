const { imagekit } = require("../config/environment.config.js");

module.exports.uploadPicture = (async (files) => {
    return new Promise(async (resolve, reject) => {
        try {
            const uploadedImages = [];

            for (const file of files) {
                try {
                    const image = await imagekit.upload({
                        file: file.buffer,
                        fileName: file.originalname,
                    });
                    uploadedImages.push(image);
                } catch (error) {
                    console.log(error);
                }
            }
            resolve(uploadedImages)
        } catch (error) {
            console.log(error);
            reject()
        }
    })
})
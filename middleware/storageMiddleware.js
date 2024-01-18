const multer = require("multer")
module.exports.uploadMiddleware = (request, response, next) => {
    try {
        const uploadFiles = multer({ storage: multer.memoryStorage() }).single('file'); //'image' = the input name  in will be in the form
        uploadFiles(request, response, err => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_UNEXPECTED_FILE") {
                    response.status(500).json({
                        message: "Error while storing image in middleware(LIMIT_UNEXPECTED_FILE).",
                        data: err
                    })
                }
            } else if (err) {
                response.status(500).json({
                    message: "Error while storing image in middleware.",
                    data: err
                })
            }
            next();
        })
    }
    catch (error) {
        response.status(500).json({
            message: "Error while storing image.",
            data: error
        })
    }
}
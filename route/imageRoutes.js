const imageController = require("../controller/imageController")
const router = require("express").Router()
const uploadMiddleware = require("../middleware/storageMiddleware")


router.post("/image",uploadMiddleware.uploadMiddleware, imageController.uploadController)

module.exports = router
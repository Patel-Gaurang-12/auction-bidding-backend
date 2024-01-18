const router = require("express").Router();
const productController = require('../controller/productController')
const userMiddleware = require("../middleware/userAuth")
const multer = require("multer")

const storage = multer.memoryStorage();
const multerUploads = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 80 * 1024 * 1024 },
}).array('img', 5);

router.post("/add-product", userMiddleware.authenticateUser, multerUploads, productController.addProduct)
router.get("/get-product", userMiddleware.authenticateUser, productController.getAllProduct)
router.get("/get-product-user-wise/", userMiddleware.authenticateUser, productController.getProductsByUser)
router.get("/get-user-wise-product/:id", userMiddleware.authenticateUser, productController.getAllProductByUser)
router.get("/get-product-id-wise/:id", userMiddleware.authenticateUser, productController.getProductsByUser)
router.put("/update-product/:id", userMiddleware.authenticateUser, productController.updateProductStatus)

module.exports = router
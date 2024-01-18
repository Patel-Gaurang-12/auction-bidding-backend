const router = require("express").Router();
const paymentController = require("../controller/paymentController")
const userMiddleware = require("../middleware/userAuth")

router.post("/add-payment", userMiddleware.authenticateUser, paymentController.addPaymentAddressDetails)
router.get("/get-payment", userMiddleware.authenticateUser, paymentController.getAllPaymentAddressDetails)
router.put("/update-payment-paid", userMiddleware.authenticateUser, paymentController.updateProductToPaid)

module.exports = router
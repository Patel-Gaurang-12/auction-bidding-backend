const router = require("express").Router();
const bidController = require("../controller/bidController")
const userMiddleware = require("../middleware/userAuth")

router.post("/add-bid", userMiddleware.authenticateUser, bidController.addBid)
router.get("/get-bid/:id", userMiddleware.authenticateUser, bidController.getBids)

module.exports = router
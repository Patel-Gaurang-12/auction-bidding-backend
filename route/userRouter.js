const router = require("express").Router();
const userController = require("../controller/userController")
const userMiddleware = require("../middleware/userAuth")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/user-profile", userMiddleware.authenticateUser, userController.getProfile)
router.get("/users", userMiddleware.authenticateUser, userController.getAllUser)
router.delete("/user/:id", userMiddleware.authenticateUser, userController.deleteUser)

module.exports = router
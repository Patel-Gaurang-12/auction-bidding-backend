const router = require("express").Router();
const categoryController = require("../controller/categoryController")
const userMiddleware = require("../middleware/userAuth")

router.post("/add-category", userMiddleware.authenticateUser, categoryController.addCategory)
router.post("/add-sub-category", userMiddleware.authenticateUser, categoryController.addSubCategory)
router.get("/get-category", userMiddleware.authenticateUser, categoryController.getCategory)
router.get("/get-sub-category", userMiddleware.authenticateUser, categoryController.getCategory)
router.delete("/delete-category/:id", userMiddleware.authenticateUser, categoryController.deleteCategory)

module.exports = router
const router = require("express").Router()
const middleware = require("../middleware/userAuth")
const subCategoryController = require("../controller/subCategoryController")

router.post("/add-subcategory", middleware.authenticateUser, subCategoryController.addSubCategory);
router.get("/sub-categories", middleware.authenticateUser, subCategoryController.getAllCategory)
router.get("/category-wise-sub-category/:id", middleware.authenticateUser, subCategoryController.getSubCategoryByCategory)
router.delete("/sub-category/:id", middleware.authenticateUser, subCategoryController.deleteSubCategory)

module.exports = router
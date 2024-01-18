const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require("./config/dbConfig").dbConnect();
const userRouters = require('./route/userRouter')
const productRouters = require('./route/productRoutes')
const categoryRouters = require("./route/categoryRoutes")
const subCategoryRouters = require("./route/subCategoryRoutes")
const bidRouters = require("./route/bidRoutes");
const imageRouters = require("./route/imageRoutes")
const paymentRouters = require("./route/paymentRoutes")
const productCloseUtil = require("./util/handleCloseProductUtil")

const app = express();
const PORT = 9999;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/user", userRouters)

app.use("/product", productRouters)

app.use("/category", categoryRouters)

app.use("/sub-category", subCategoryRouters)

app.use("/bid", bidRouters)

app.use("/image", imageRouters)

app.use("/payment", paymentRouters)

// setInterval(async () => {
//     const data = await productCloseUtil.handleCloseProduct();
// }, 10000)

app.listen(PORT, () => {
    console.log("server listen on ", PORT);
})
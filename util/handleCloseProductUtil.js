const nodemailer = require("nodemailer")
const productModel = require("../model/productModel");
const bidModel = require("../model/bidModel");
const userModel = require("../model/userModel");

module.exports.handleCloseProduct = (async () => {
    try {
        const date = new Date();
        const data = await productModel.find({
            endDate: {
                $lte: date
            },
            $or: [
                { status: "live" },
                { status: "pending" }
            ]
        }).populate("userId").exec();
        data?.forEach(async (element) => {
            await sendMail(element);
        })
    } catch (error) {
        console.log("error in product close handler: ", error);
    }
})

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'alliedge.technology@gmail.com',
        pass: 'rmpfqnoxhbdqaqlq'
    }
});

const sendMail = (data) => {
    return new Promise(async (resolve, reject) => {
        if (data === undefined || data.length === 0 || !data) {
            reject("no data available.")
        }
        const winUser = await bidModel.findOne({ productId: data._id })
            .populate("userId")
            .sort({ amount: -1 })
            .limit(1);

        const userProduct = await userModel.updateOne(
            { _id: winUser?.userId?._id, 'win.productId': { $ne: data._id } },
            { $push: { win: { productId: data._id, winAmount: winUser?.amount } } });
        console.log("win product : ", userProduct);

        const mailOptions = {
            from: "alliedge.technology@gmail.com",
            to: winUser?.userId?.email,
            subject: "Congratulations! You've Won the Auction!",
            text: `
            Dear ${winUser?.userId?.userName},
            
            We are thrilled to inform you that you have won the auction for the following product:
            
            Product Name: ${data?.title}
            Auction End Date: ${data?.endDate}
            
            We want to extend our heartfelt congratulations on your successful bid! Your dedication and commitment to securing this item are truly commendable. You are now the proud owner of this fantastic product.
            
            Here are some important details and next steps:

            1. Payment: Please proceed to make the payment for the winning bid amount as soon as possible. You can find payment instructions and methods in your account.

            2. Shipping: Our team will prepare your item for shipment. You can expect to receive it at the address provided during the registration process. If you need to update your shipping information, please do so promptly.

            3. Questions or Assistance: If you have any questions or need assistance with the payment or shipping process, please don't hesitate to contact our customer support team at [Customer Support Email or Phone Number].

            We would like to express our gratitude for your participation in our auction and for making it a success. Your support helps us continue to provide exciting opportunities for our community of bidders.

            Thank you once again, and congratulations on your win!

            Warm regards,

            E_NILAM`,
        };
        transporter.sendMail(mailOptions, async function (err, info) {
            try {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Mail sent successfully!");
                    const update = await productModel.findByIdAndUpdate(data._id, { status: "closed" }, { new: true });
                    resolve(update)
                }
            } catch (error) {
                throw new Error("error in send email", error)
            }
        });
    })
}

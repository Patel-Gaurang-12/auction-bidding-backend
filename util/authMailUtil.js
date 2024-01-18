const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'alliedge.technology@gmail.com',
        pass: 'rmpfqnoxhbdqaqlq'
    }
});

module.exports.sendMail = (email) => {
    return new Promise(async (resolve, reject) => {
        console.log("email", email);
        const pin = generateDigits();
        const mailOptions = {
            from: "alliedge.technology@gmail.com",
            to: email,
            subject: "Verify your login!",
            text: `
            
            Please use the following code to verify your login: ${pin}

            Warm regards,
            E_NILAM`,
        };

        transporter.sendMail(mailOptions, async function (err, info) {
            try {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Mail sent successfully!", info);
                    resolve(pin)
                }
            } catch (error) {
                throw new Error("error in send email", error)
            }
        });
    })
}

const generateDigits = () => {
    return Math.floor(100000 + Math.random() * 900000);
}
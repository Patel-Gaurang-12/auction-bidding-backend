const bcrypt = require("bcrypt")

module.exports.encryptPassword = (async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.log("error while encrypt password ", error);
    }
})

module.exports.comparePassword = (async (password, encryptedPassword) => {
    try {
        return bcrypt.compareSync(password, encryptedPassword);
    } catch (error) {
        console.log("error while comparing password ", error);
    }
})
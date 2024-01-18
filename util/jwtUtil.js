const jwt = require("jsonwebtoken");
const secretkey = "secretKeyHere";


module.exports.generageToken = (async (user) => {
    try {
        return jwt.sign({ user }, secretkey, { expiresIn: "7d" });
    } catch (error) {
        console.log(error);
        throw new Error("Error in jwt tocken, ", error)
    }
})

module.exports.authenticateUser = (token) => {
    try {
        token = token.split(" ")[1];
        const user = jwt.verify(token, secretkey);
        return user
    } catch (error) {
        throw new Error(error)
    }
}
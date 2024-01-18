const jwtUtil = require("../util/jwtUtil");

module.exports.authenticateUser = async (request, response, next) => {
    try {
        const token = request.headers.authorization;
        if (token !== null && token !== "" && token !== undefined && token.startsWith("Bearer ")) {
            try {
                const user = jwtUtil.authenticateUser(token);
                if (user) {
                    request.user = user.user
                    next()
                } else {
                    response.status(404).json({
                        message: "Unauthorized access",
                        data: "Unauthorized access"
                    })
                }
            } catch (error) {
                if (error.message.includes("jwt expired")) {
                    response.status(404).json({
                        message: "token expired",
                        data: error
                    })
                } else {
                    response.status(404).json({
                        message: "Invalid token",
                        data: "Invalid token"
                    })
                }
            }
        } else {
            response.status(404).json({
                message: "Token is required or Unauthorized access",
                data: "Token is required of Unauthorized access"
            })
        }
    } catch (error) {
        response.status(404).json({
            message: "Internal server error",
            data: error
        });
    }
}
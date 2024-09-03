const jwt = require("jsonwebtoken")
require("dotenv").config();

const auth = (req, res, next) => {
    const white_lists = ["/", "/register", "/login"];
    if (white_lists.find(item => '/api' + item === req.originalUrl)) {
        next();
    } else {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = {
                    email: decoded.email,
                    name: decoded.name
                }
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "No Access Token / Expried"
                })
            }
        } else {
            return res.status(401).json({
                message: "No Access Token / Expried"
            })
        }
    }
}
module.exports = auth;
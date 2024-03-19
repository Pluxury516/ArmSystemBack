const jwt = require('jsonwebtoken')
const secret = process.env["SECRET_KEY"]
module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(403).json({
                message: "User is not authorized",
                status:'error'
            })
        }
        req.user = jwt.verify(token, secret)
        next()
    } catch (e) {
        return res.status(403).json({
            message: "Not authorized",
            status:'error'
        })
    }
}
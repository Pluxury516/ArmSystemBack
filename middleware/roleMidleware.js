const jwt = require("jsonwebtoken")
const secret = process.env["SECRET_KEY"]
module.exports = function (roles){
    return function (req,res,next){
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                res.status(403).json({
                    message: "User is not authorized",
                    status:'error'
                })
            }
            const {roles:userRoles} = jwt.verify(token, secret)
            let hashRole = false
            roles.forEach((role)=>{
                if(userRoles.includes(role)){
                    hashRole = true
                }
            })
            if(!hashRole){
                return res.status(403).json({
                    message: "No access",
                    status:'error'
                })
            }
            req.user = jwt.verify(token, secret)
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({
                message: "Not authorized",
                status:'error'
            })
        }
    }
}
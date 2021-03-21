require("dotenv").config()
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.header("x-auth-token")

    if(!token){
        res.status(401).json({message: "Invalid credentials"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.id = decoded.id
        next()
    } catch (error) {
        res.status(401).json({message: "Invalid credentials"})
    }
}

module.exports = auth
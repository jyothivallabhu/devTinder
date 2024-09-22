const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    // get the token
    try {
        const cookies = req.cookies
         const { token } = cookies
    
        if (!token) {
            throw new Error("Invalid Token")
        }
        //validtae token
        const decodedObj = jwt.verify(token, "DevTinder@14")
        const {_id}= decodedObj
        const user = await User.findById({_id: _id})
    
        if (!user) {
            throw new Error("User Not Found")
            
        }
        req.user = user
        next()
    } catch (err) {
        res.status(400).send(err.message)
    }
    
    //find the user
}

module.exports = {
    userAuth
}
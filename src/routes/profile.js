const express = require("express")
const profileRouter = express.Router();
const{userAuth} = require("../middlewares/auth")

profileRouter.get("/profile",userAuth, async (req, res) => {

    try {
        /* const cookies = req.cookies;
        const {token} = cookies
        if (!token) {
            throw new Error("Invalid Token")
        }

        const decodedOutput = jwt.verify(token, "DevTinder@14")
        console.log(decodedOutput)
        const user = await User.findById(decodedOutput?._id)
        if (!user) {
            throw new Error("Please Login again")
        } */
        const user = req.user
        res.send(user)
    } catch(err) {
        res.status(400).send(err.message)
    }
    
})

module.exports = profileRouter


const express = require("express")
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
    
    const { firstName, lastName, email, password } = req.body
    const enctyptedPass = await bcrypt.hash(password, 16)

    const user = new User({
        firstName, lastName, email, password:enctyptedPass
    }) 


    try {
        const userData = await user.save(); 
        console.log(userData);
        res.send("User created successfully")
    } catch (err) {
        res.status(400).send("Error in saving data"+err.message)
    }
    
}) 

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
     
    try {
        const userData = await User.findOne({ email: email })
        if (!userData) {
            throw new Error("User Not Found")
        }
 
        
        const isPasswordValid = await userData.validatePassword(password);

        console.log(isPasswordValid);
        
        if (isPasswordValid) { 

           const token =  jwt.sign({ _id: userData?._id }, "DevTinder@14")
            console.log(token)
            res.cookie("token",token)
            res.send("Login Successfull")
        }
        else {
            throw new Error("Invalid Credentials")
        }
        
        
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = authRouter;


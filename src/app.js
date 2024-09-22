const express = require("express")
const connectDb = require("./config/database")
const app = express();
const bcrypt = require("bcrypt")

const User = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

app.use(express.json())
app.use(cookieParser())
app.post("/signup", async (req, res) => {
    
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

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const userData = await User.findOne({ email: email })
        if (!userData) {
            throw new Error("User Not Found")
        }
        if (password === userData.password) { 

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

app.get("/profile", async (req, res) => {

    try {
        const cookies = req.cookies;
        const {token} = cookies
        if (!token) {
            throw new Error("Invalid Token")
        }

        const decodedOutput = jwt.verify(token, "DevTinder@14")
        console.log(decodedOutput)
        const user = await User.findById(decodedOutput?._id)
        if (!user) {
            throw new Error("Please Login again")
        }
        res.send(user)
    } catch(err) {
        res.status(400).send(err.message)
    }
    
})

app.get("/userslist", async (req, res) => {
    try {
        const users = await User.find()
        if (users.length === 0) {
            res.status(404).send("No users found")
        } else {
            console.log(users)
            res.send(users)
        }
        
    } catch(err) {
        res.status(400).send("something went worng")
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId
    console.log(userId)
    try {
        const user = await User.findByIdAndDelete({_id:userId})
        res.send('deleted successfully')
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

app.patch("/user", async (req, res) => {
    const userData = req.body
    const id = req.body.userId
    try{
        const updatedUser = await User.findByIdAndUpdate(id, userData)
        console.log(updatedUser)
        res.send("updated successfully")
    } catch (err) {
        res.status(400).send("something went wrong")
    }
})


connectDb().then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
        console.log('server is running');
    })
        
}).catch((err) => {
    console.error("error in  connecting"+ err);
})




const express = require("express")
const connectDb = require("./config/database")
const app = express();

const User = require("./models/user")


app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: 'Jyoti',
        lastName: 'Vallabhu',
        email: 'v.jyothi55@gmail.com',
        password: 'Jyothi@14',
        status : 'pending'
    }) 

    try {
        const userData = await user.save(); 
        console.log(userData);
        res.send("User created successfully")
    } catch (err) {
        res.status(400).send("Error in saving data"+err.message)
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




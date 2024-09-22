const express = require("express")
const connectDb = require("./config/database")
const app = express();

const User = require("./models/user");
const cookieParser = require("cookie-parser");
const authRouter  = require("./routes/auth")
const profileRouter  = require("./routes/profile")

app.use(express.json())
app.use(cookieParser())


app.use("/", authRouter)



connectDb().then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
        console.log('server is running');
    })
        
}).catch((err) => {
    console.error("error in  connecting"+ err);
})




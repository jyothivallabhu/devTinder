const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type : String
    },
    lastName: {
        type : String
    },
    email: {
        type: String
    },
    password: {
        type:String
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("USER", userSchema)

module.exports = User;

//module.exports = mongoose.model("User", userSchema);
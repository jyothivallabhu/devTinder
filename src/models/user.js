const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength : 25
    },
    lastName: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ("Enter valid email")
            }
        }
    },
    password: {
        type: String,
        required : true
    },
    status: {
        type: String
    }
},{ timestamps: true })

const User = mongoose.model("USER", userSchema)

module.exports = User;

//module.exports = mongoose.model("User", userSchema);
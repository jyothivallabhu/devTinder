const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

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


userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};


const User = mongoose.model("USER", userSchema)

module.exports = User;

//module.exports = mongoose.model("User", userSchema);
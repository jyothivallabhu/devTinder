const mongoose = require("mongoose")

const connectDb = async () => {
   await  mongoose.connect("mongodb+srv://vjyothi55:vsUnvYj5PqFlXD6P@namastedev.iblosvo.mongodb.net/devTinder")
}

module.exports = connectDb
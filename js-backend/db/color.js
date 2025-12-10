const mongoose = require("mongoose")
const colorSchema = new mongoose.Schema({
    name:String
})

const Color = mongoose.model("colors", colorSchema)
module.exports = Color
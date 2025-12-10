const mongoose = require("mongoose")
const materialSchema = new mongoose.Schema({
    name:String,
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'categories'},
    brandId: {type: mongoose.Schema.Types.ObjectId, ref:'brands'},
    finishId: {type:mongoose.Schema.Types.ObjectId, ref:'colors'},
    pattiPrice: Number,
    handalPrice:Number,
    image:String,
    imageName:String
})

const Material = mongoose.model("materials", materialSchema)
module.exports = Material
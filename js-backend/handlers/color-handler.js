const Color = require("../db/color");

async function addColor(model) {
    let color = new Color({
        name:model.name
    })
    await color.save()
    return color.toObject()
}

async function getColors() {
    let colors = await Color.find()
    return colors.map((c)=>c.toObject())
}

async function updateColor(id, model) {
    await Color.findByIdAndUpdate({_id:id}, model)
    return
}

async function deleteColor(id) {
    await Color.findByIdAndDelete({_id:id})
    return
}

async function getColorById(id) {
    let color = await Color.findById(id)
    return color.toObject()
}

module.exports = {addColor, getColors, updateColor, deleteColor, getColorById}
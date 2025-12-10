const Material = require("../db/material");

async function addMaterial(model) {
    let material = new Material({
        ...model
    })
    await material.save()
    return material.toObject()
}

async function getMaterials() {
    let materials =await Material.find()
    return materials.map((m)=>m.toObject())
}

async function updateMaterial(id, model) {
    await Material.findByIdAndUpdate({_id:id}, model)
    return
}

async function deleteMaterial(id) {
    await Material.findByIdAndDelete({_id:id})
    return
}

async function getMaterialById(id) {
    let material = await Material.findById(id)
    return material.toObject()
}

module.exports = {addMaterial, getMaterials, updateMaterial, deleteMaterial, getMaterialById}
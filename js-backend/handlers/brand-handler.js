const Brand = require("../db/brand");

async function addBrand(model) {
    let brand = new Brand({
        name:model.name
    })
    await brand.save()
    return brand.toObject()
}

async function getBrands() {
    let brands = await Brand.find()
    return brands.map((b)=> b.toObject())
}

async function updateBrand(id, model) {
    await Brand.findByIdAndUpdate({_id: id}, model)
    return
}

async function deleteBrand(id) {
    await Brand.findByIdAndDelete({_id:id})
    return
}

async function getBrandById(id) {
    let brand = await Brand.findById(id)
    return brand.toObject()
}

module.exports = {addBrand, getBrands, updateBrand, deleteBrand, getBrandById}
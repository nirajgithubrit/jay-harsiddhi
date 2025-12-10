const Category = require("../db/category");

async function addCategory(model) {
    let category = new Category({
        name:model.name
    })
    
    await category.save()
    return category.toObject()
}

async function getCategories() {
    let category = await Category.find()
    return category.map((c)=>c.toObject())
}

async function updateCategory(id, model) {
    await Category.findByIdAndUpdate({_id:id}, model)
    return
}

async function deleteCategory(id) {
    await Category.findByIdAndDelete({_id:id})
    return
}

async function getCategoryById(id) {
    let category = await Category.findById(id)
    return category.toObject()
}

module.exports = {addCategory, getCategories, updateCategory, deleteCategory, getCategoryById}
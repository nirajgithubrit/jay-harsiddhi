const express = require("express")
const { addCategory, getCategories, updateCategory, deleteCategory, getCategoryById } = require("../handlers/category-handler")
const router = express.Router()

router.post('/', async(req, res)=>{
const model = req.body
let result = await addCategory(model)
res.send(result)
})

router.get('/', async(req, res)=>{
    let result = await getCategories()
    res.send(result)
})

router.put('/:id', async(req, res)=>{
    const id = req.params["id"]
    const model = req.body
    await updateCategory(id, model)
    res.send({message:"updated"})
})

router.delete('/:id', async(req, res)=>{
    const id = req.params["id"]
    await deleteCategory(id)
    res.send({message: "deleted"})
})

router.get('/:id', async(req, res)=>{
    const id = req.params["id"]
    let result = await getCategoryById(id)
    res.send(result)
})

module.exports = router
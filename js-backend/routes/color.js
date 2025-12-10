const express = require("express")
const { addColor, getColors, updateColor, deleteColor, getColorById } = require("../handlers/color-handler")
const router = express.Router()

router.post('/', async(req,res)=>{
    const model = req.body
    let result = await addColor(model)
    res.send(result)
})

router.get('/', async(req, res)=>{
    let result = await getColors()
    res.send(result)
})

router.put('/:id', async(req, res)=>{
    const id = req.params["id"]
    const model = req.body
    await updateColor(id, model)
    res.send({message:"updated"})
})

router.delete('/:id', async(req, res)=>{
    const id = req.params["id"]
    await deleteColor(id)
    res.send({message:"deleted"})
})

router.get('/:id', async(req, res)=>{
    const id = req.params["id"]
    let result = await getColorById(id)
    res.send(result)
})

module.exports = router
const express = require("express")
const { addMaterial, getMaterials, updateMaterial, deleteMaterial, getMaterialById } = require("../handlers/material-handler")
const router = express.Router()

router.post('/', async(req,res)=>{
    const model = req.body
    let result = await addMaterial(model)
    res.send(result)
})

router.get('/', async(req, res)=>{
    let result = await getMaterials()
    res.send(result)
})

router.put('/:id', async(req, res)=>{
    const id = req.params["id"]
    const model = req.body
    await updateMaterial(id, model)
    res.send({message:"updated"})
})

router.delete('/:id', async(req, res)=>{
    const id = req.params["id"]
    await deleteMaterial(id)
    res.send({message:"deleted"})
})

router.get('/:id', async(req,res)=>{
    const id = req.params["id"]
    let result = await getMaterialById(id)
    res.send(result)
})

module.exports = router
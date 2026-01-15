const express = require("express")
const { addCustomer, getAllCustomer, addShutters, getCustomerById, addExtraGlasses, addAmount, addOrderDetail, updateCustomer, addOtherDetails } = require("../handlers/customer")
const { getCategories } = require("../handlers/category-handler")
const { getMaterials } = require("../handlers/material-handler")
const router = express.Router()

router.post('/', async(req,res)=>{
    const model = req.body
    const user = req.user
    
    let result = await addCustomer(model, user.email)
    res.send(result)
})

router.get('/', async(req, res) => {
    const user = req.user
    let result = await getAllCustomer(user.email)
    res.send(result)
})

router.get('/category', async(req, res)=>{
    let result = await getCategories()
    res.send(result)
})

router.get('/material', async(req, res)=>{
    let result = await getMaterials()
    res.send(result)
})

router.get('/:id', async(req,res)=>{
    const id = req.params["id"]
    let result = await getCustomerById(id)
    res.send(result)
})

router.put('/:id', async(req,res)=>{
    const id = req.params["id"]
    const model = req.body
    const user = req.user
    let result = await updateCustomer(id, model, user.email)
    res.send(result)
})

router.post('/:id/add-shutters', async(req,res)=>{
    const id = req.params["id"]
    const model = req.body
    let result = await addShutters(id, model)
    res.send(result)
})

router.post('/:id/add-glasses', async(req, res)=>{
    const id = req.params["id"]
    const glasses = req.body
    let result = await addExtraGlasses(id, glasses)
    res.send(result)
})

router.post('/:id/add-amount', async(req,res)=>{
    const id = req.params["id"]
    const model = req.body
    let result = await addAmount(id, model.amount)
    res.send(result)
})

router.post('/:id/add-orderDetail', async(req, res)=>{
    const id = req.params["id"]
    const model = req.body
    let result = await addOrderDetail(id, model)
    res.send(result)
})

router.post('/:id/add-other', async(req, res)=>{
    const id = req.params["id"]
    const model = req.body
    const result = await addOtherDetails(id, model)
    res.send(result)
})

module.exports = router
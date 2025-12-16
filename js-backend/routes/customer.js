const express = require("express")
const { addCustomer, getAllCustomer, addShutters, getCustomerById, addExtraGlasses, addMaterial, getAllMaterial, getCustomerMaterial, addAmount, addOrderDetail } = require("../handlers/customer")
const router = express.Router()

router.post('/', async(req,res)=>{
    const model = req.body
    let result = await addCustomer(model)
    res.send(result)
})

router.get('/', async(req, res) => {
    let result = await getAllCustomer()
    res.send(result)
})

router.get('/material', async(req, res)=>{
    let result = await getAllMaterial()
    res.send(result)
})

router.get('/:id', async(req,res)=>{
    const id = req.params["id"]
    let result = await getCustomerById(id)
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

router.get('/:id/customer-material', async(req, res)=>{
    const id = req.params["id"]
    let result = await getCustomerMaterial(id)
    res.json({ success: true, result })
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

module.exports = router
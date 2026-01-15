const Customer = require("../db/customer");

async function addCustomer(model, userId) {
    let customer = new Customer({
        name:model.name,
        phoneNumber:model.phoneNumber,
        address:model.address,
        salesPersonId: userId
    })

    await customer.save()
    return customer.toObject({flattenMaps:true}) 
}

async function getAllCustomer(userId) {
    let customers = await Customer.find({salesPersonId: userId})
    return customers.map((c)=>c.toObject({flattenMaps:true}))
}

async function getCustomerById(id) {
    let customer = await Customer.findById(id)
    return customer.toObject({flattenMaps:true})
}

async function updateCustomer(id, model, userId) {
    const customerDTO = {
        name:model.name,
        phoneNumber:model.phoneNumber,
        address:model.address,
        salesPersonId: userId
    }
    let customer = await Customer.findOneAndUpdate({_id:id}, customerDTO)
    return customer.toObject({flattenMaps:true})
}

async function addShutters(id, model) {
    let customer = await Customer.findById(id)
    customer.shutters = model.shutters
    customer.material = model.material
    customer.totalAmount = model.amount
    await customer.save()
    return customer.toObject({flattenMaps:true})
}

async function addExtraGlasses(id, model) {
    let customer = await Customer.findById(id)
    customer.extraGlasses = model.glasses
    customer.material = model.material
    customer.totalAmount = model.amount
    await customer.save()
    return customer.toObject({flattenMaps:true})
}

async function addAmount(id, model) {
    let customer = await Customer.findById(id)
    customer.totalAmount = model
    await customer.save()
    return customer.toObject({flattenMaps:true})
}

async function addOrderDetail(id, model) {
    let customer = await Customer.findById(id)
    customer.recievedAmount = model.recievedAmount
    customer.orderStatus = model.orderStatus
    customer.paymentMethod = model.paymentMethod
    await customer.save()
    return customer.toObject({flattenMaps:true})
}

async function addOtherDetails(id, model) {
    let customer = await Customer.findById(id)
    customer.other = model.other
    customer.totalAmount = model.amount
    await customer.save()
    return customer.toObject({flattenMaps:true})
}

module.exports = {addCustomer, getAllCustomer, addShutters, getCustomerById, updateCustomer, addExtraGlasses, addAmount, addOrderDetail, addOtherDetails}
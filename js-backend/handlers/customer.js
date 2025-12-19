const Customer = require("../db/customer");
const Material = require("../db/material");

async function addCustomer(model) {
    let customer = new Customer({
        name:model.name,
        phoneNumber:model.phoneNumber,
        address:model.address
    })

    await customer.save()
    return customer.toObject() 
}

async function getAllCustomer() {
    let customers = await Customer.find()
    return customers.map((c)=>c.toObject())
}

async function getCustomerById(id) {
    let customer = await Customer.findById(id)
    return customer.toObject()
}

async function addShutters(id, model) {
    let customer = await Customer.findById(id)
    customer.shutters = model.shutters
    customer.material = model.material
    await customer.save()
    return customer.toObject()
}

async function addExtraGlasses(id, model) {
    let customer = await Customer.findById(id)
    customer.extraGlasses = model.glasses
    customer.material = model.material
    await customer.save()
    return customer.toObject()
}

async function getAllMaterial() {
    let materials = await Material.find()
    return materials.map((m)=>m.toObject())
}

async function  getCustomerMaterial(id) {
    let customer = await Customer.findById(id)
    if (customer.material) {
      customer.material.profileCount = convertMap(customer.material.profileCount);
      customer.material.hingesCount = convertMap(customer.material.hingesCount);
      customer.material.pumpCount = convertMap(customer.material.pumpCount);
      customer.material.glassArea = convertMap(customer.material.glassArea);
      customer.material.addedGlassArea = convertMap(customer.material.addedGlassArea);
      customer.material.profilePatti = convertMap(customer.material.profilePatti);
    }
    return customer.material
}

function convertMap(obj) {
      if (!obj) return {};
      if (obj instanceof Map) return Object.fromEntries(obj);
      if (typeof obj === 'object') return obj; // already plain
      return obj;
}

async function addAmount(id, model) {
    let customer = await Customer.findById(id)
    customer.totalAmount = model
    await customer.save()
    return customer.toObject()
}

async function addOrderDetail(id, model) {
    let customer = await Customer.findById(id)
    customer.recievedAmount = model.recievedAmount
    customer.orderStatus = model.orderStatus
    customer.paymentMethod = model.paymentMethod
    await customer.save()
    return customer.toObject()
}

module.exports = {addCustomer, getAllCustomer, addShutters, getCustomerById, addExtraGlasses, getAllMaterial, getCustomerMaterial, addAmount, addOrderDetail}
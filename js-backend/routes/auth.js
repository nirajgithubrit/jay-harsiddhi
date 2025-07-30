const express = require("express")
const { registerUser, loginUser } = require("../handlers/auth-handler")
const router = express.Router()

router.post("/register", async (req, res) => {
    let model = req.body
    if (model.name && model.email && model.password) {
        await registerUser(model)
        res.send({
            message: "User Registered"
        })
    } else {
        res.status(400).json({
            error: "Please Provide name, email and password"
        })
    }
})

router.post("/login", async (req, res) => {
    let model = req.body
    if (model.email && model.password) {
        const result = await loginUser(model)
        if (result) {
            res.send(result)
        } else {
            res.status(400).json({
                error: "Email or password is incorrect"
            })
        }
    } else {
        res.status(400).json({
            error: "Please Provide email and password"
        })
    }
})

module.exports = router
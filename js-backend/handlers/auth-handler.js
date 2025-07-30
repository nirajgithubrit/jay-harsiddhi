const User = require("../db/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerUser(model) {
    const hasPassword = await bcrypt.hash(model.password, 10)
    let user = new User({
        name: model.name,
        email: model.email,
        password: hasPassword
    })
    await user.save()
}

async function loginUser(model) {
    let user = await User.findOne({ email: model.email })
    let isMatched = await bcrypt.compare(model.password, user.password)

    if (!user) {
        return null
    }

    if (isMatched) {
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },
            "secret",
            {
                expiresIn: "10h"
            }
        )
        const userObj = user.toObject()
        delete userObj.password
        return { token, userObj }
    } else {
        return null
    }
}

module.exports = { registerUser, loginUser }
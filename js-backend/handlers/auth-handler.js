const User = require("../db/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerUser(model) {
    const hasPassword = await bcrypt.hash(model.password, 10)
    let user = new User({
        name: model.name,
        email: model.email,
        password: hasPassword,
        isAdmin:false,
        isSalesPerson:false
    })
    await user.save()
}

async function loginUser(model) {
    let user = await User.findOne({ email: model.email });
    if (!user) return null;

    let isMatched = await bcrypt.compare(model.password, user.password);
    if (!isMatched) return null;

    // Access Token (short life)
    const accessToken = jwt.sign(
        {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin || false,
            isSalesPerson: user.isSalesPerson || false
        },
        "ACCESS_SECRET",
        { expiresIn: "10h" }
    );

    // Refresh Token (long life)
    const refreshToken = jwt.sign(
        { id: user._id },
        "REFRESH_SECRET",
        { expiresIn: "7d" }
    );

    const userObj = user.toObject();
    delete userObj.password;

    return { accessToken, refreshToken, userObj };
}

async function refreshToken(model) {
    const decoded = jwt.verify(model, "REFRESH_SECRET");

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            "ACCESS_SECRET",
            { expiresIn: "10h" }
        );

    return newAccessToken
}

module.exports = { registerUser, loginUser, refreshToken }
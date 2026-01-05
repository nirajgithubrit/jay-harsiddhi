const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).send({
            error: "Access denied"
        });
    }
    try {
        const decode = jwt.verify(token, "ACCESS_SECRET")
        req.user = decode
        next();
    } catch (err) {
        return res.status(401).send({
            error: "Token expired"
        });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({
            error: "Forbidden"
        });
    }
}

function isSalesPerson(req, res, next){
    if(req.user && req.user.isSalesPerson){
        next();
    }else{
        return res.status(403).send({
            error: "Forbidden"
        });
    }
}

module.exports = { verifyToken, isAdmin, isSalesPerson }
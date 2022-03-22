const jwt = require("jsonwebtoken")
const Token = require("../models/Token")

// Token when User login
const verifyToken = async (req, res, next) => {
    try {
        const result = await Token.findOne({
            userId: req.body.userId
        }).exec();
        jwt.verify(result.token, 'random', (err, user) => {
            if (err)
                return res.status(403).json("Unvalid Token")
            req.user = user
            next()
        })
    } catch (err) {
        return res.status(401).json("Not authenticated")
    }
}
// Check if the User is an Admin on the request (Dor && Rotem)
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("No permission")
        }
    })
}

const verifyAdminOrSelfUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin || req.params.id === req.user._id) {
            next()
        } else {
            res.status(403).json("No permission")
        }
    })
}

const verifyIsLoggedIn = async (req, res, next) => {
    try {
        const result = await Token.findOne({
            userId: req.session.user._id
        }).exec();
        jwt.verify(result.token, 'random', (err, user) => {
            if (err)
                return {
                    message: "Unvalid Token"
                }
            req.user = user
            req.token = result.token
        })
        return {
            user: req.user,
            token: req.token
        }

    } catch (err) {
        return {
            user: null,
            token: null,
            message: 'Not Saved in tokens table'
        }
    }

}
module.exports = {
    verifyToken,
    verifyIsLoggedIn,
    verifyTokenAndAdmin,
    verifyAdminOrSelfUser
}
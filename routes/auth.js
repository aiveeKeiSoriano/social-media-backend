const express = require("express")
const userController = require("../controllers/userController")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/signup", async (req, res) => {
    let result = await userController.createUser(req.body)
    if (result.status) {
        res.status(201).send(result.result)
    }
    else {
        res.status(401).send(result.result)
    }
})

router.post("/signin", async (req, res) => {
    let result = await userController.validateUser(req.body)
    if (result.status) {
        let payload = {
            username: result.result.username
        }
        let access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
        let refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE })
        await userController.addRefresh(result.result, refresh_token)
        res.status(201).send({ access_token, refresh_token })
    }
    else {
        res.status(401).send(result.result)
    }
})

router.post("/logout", async (req, res) => {

})

router.post("/token", async (req, res) => {

})

module.exports = router
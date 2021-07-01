require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

const authRouter = require("./routes/auth")
const userController = require("./controllers/userController")

const jwt = require("jsonwebtoken")

const app = express()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to mongodb"))

app.use(morgan("dev"))
app.use(express.json())

app.use('/auth', authRouter)

app.get('/followers', async (req, res) => {
    let header = req.headers["authorization"]
    let access_token = header.split(" ")[1]
    let user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
    let result = await userController.getFollowers(user.username)
    if (result.status) {
        res.status(200).send(result.result)
    }
    else {
        res.status(401).send(result.result)
    }
})

app.get('/following', async (req, res) => {
    let header = req.headers["authorization"]
    let access_token = header.split(" ")[1]
    let user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
    let result = await userController.getFollowing(user.username)
    if (result.status) {
        res.status(200).send(result.result)
    }
    else {
        res.status(401).send(result.result)
    }
})

app.post('/follow/:username', async (req, res) => {
    let header = req.headers["authorization"]
    let access_token = header.split(" ")[1]
    let user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
    let result = await userController.followUser(user.username, req.params.username)
    if (result.status) {
        res.status(201).send(result.result)
    }
    else {
        res.status(401).send(result.result)
    }
})

app.post('/unfollow/:username',async (req, res) => {
    let header = req.headers["authorization"]
    let access_token = header.split(" ")[1]
    let user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
    let result = await userController.unfollowUser(user.username, req.params.username)
    if (result.status) {
        res.status(201).send(result.result)
    }
    else {
        res.status(401).send(result.result)
    }
})

app.post('/block/:username', async (req, res) => {
    let header = req.headers["authorization"]
    let access_token = header.split(" ")[1]
    let user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
    let result = await userController.blockUser(user.username, req.params.username)
    if (result.status) {
        res.status(201).send(result.result)
    }
    else {
        res.status(401).send(result.result)
    }
})

app.get("/", (req, res) => {
    res.send("Ayo, welcome")
})

const PORT = 3333
app.listen(PORT, () => console.log("Server listening to", PORT))
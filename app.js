require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

const authRouter = require("./routes/auth")

const jwt = require("jsonwebtoken")

const app = express()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to mongodb"))

app.use(morgan("dev"))
app.use(express.json())

app.use('/auth', authRouter)

app.get("/", (req, res) => {
    res.send("Ayo, welcome")
})

const PORT = 3333
app.listen(PORT, () => console.log("Server listening to", PORT))
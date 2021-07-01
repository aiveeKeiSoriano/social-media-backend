const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

const jwt = require("jsonwebtoken")

const app = express()

app.use(morgan("dev"))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to mongodb"))

const PORT = 3333
app.listen(PORT, () => console.log("Server listening to"))
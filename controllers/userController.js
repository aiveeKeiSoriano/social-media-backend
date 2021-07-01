const User = require("../models/user")
const bcrypt = require("bcrypt")

const createUser = async ({ username, email, password }) => {
    if (!username || !email || !password) {
        return { status: false, result: "Incomplete details" }
    }
    let emailRegex = /.+@.+[.].+/
    if (!emailRegex.test(email)) {
        return { status: false, result: "Bad email format" }
    }
    let hash = await bcrypt.hash(password, 10)
    let newUser = new User({ username, email, password: hash })
    try {
        let savedUser = await newUser.save()
        return { status: true, result: savedUser }
    }
    catch (e) {
        if (e.message.includes("dup key: { email")) {
            return { status: false, result: "Email is already in use" }
        }
        else if (e.message.includes("dup key: { username")) {
            return { status: false, result: "Username is already in use" }
        }
        else {
            return { status: false, result: e.message }
        }
    }
}

const validateUser = async () => {

}

const getFollowers = async () => {

}

const getFollowing = async () => {

}

const followUser = async () => {

}

module.exports = {
    createUser,
    validateUser
}
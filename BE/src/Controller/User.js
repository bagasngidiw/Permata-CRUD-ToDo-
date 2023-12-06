const {
    User
} = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

// get user
const getUser = async (req, res)=> {
    const user = await User.find()

    res.status(200).json(user)
}

// register
const register = async (req, res) => {
    const {
        name,
        phoneNumber,
        email,
        username,
        password
    } = req.body

    try {
        const checkEmailUsername = await User.countDocuments({
            email,
            username
        })

        if (checkEmailUsername > 0) {
            return res.status(400).json("Email/Username Already Exist")
        }

        const encryptPass = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            phoneNumber,
            email,
            username,
            password: encryptPass
        })

        res.status(201).json({
            user,
            message: "Register Success"
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body

    try {

        const user = await User.findOne({
            username,
        })
        if (!user) {
            return res.status(401).json({
                message: "Cannot Find User"
            })
        }

        const encryptPass = await bcrypt.hash(password, 10)

        const isPwValid = await bcrypt.compare(password, encryptPass);

        if (!isPwValid) {
            return res.status(401).json({
                message: "Cannot Find User"
            })
        }

        const token = jwt.sign({
            user
        }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        return res.status(200).json({
            username: user.username,
            message: "Login Success",
            token: token
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}


module.exports = {
    getUser,
    register,
    login,
}
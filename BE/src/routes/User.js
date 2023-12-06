const express = require('express')
const router = express.Router()
const{
    getUser,
    register,
    login,
} = require('../Controller/User')

router.get('/', getUser)

router.post('/register', register)

router.post('/login', login)




module.exports = router

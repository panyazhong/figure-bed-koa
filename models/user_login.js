const mongoose = require('mongoose')
const userLoginSchema = require('../schemas/user_login')

const userLoginModel = mongoose.model('user_login', userLoginSchema)

module.exports = userLoginModel
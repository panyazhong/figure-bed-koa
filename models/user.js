const mongoose = require('../utils/connect')
const userSchema = require('../schemas/user')

module.exports = mongoose.model('User', userSchema)


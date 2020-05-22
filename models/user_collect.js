const mongoose = require('mongoose')
const userCollectSchema = require('../schemas/user_collect')

const userCollectModel = mongoose.model('user_collect', userCollectSchema)

module.exports = userCollectModel
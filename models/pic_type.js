const PicTypeSchema = require('../schemas/pic_type')
const mongoose = require('mongoose')

module.exports = mongoose.model('pic_type', PicTypeSchema)
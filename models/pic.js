const mongoose = require('../utils/connect')
const PicSchema = require('../schemas/pic')

module.exports = mongoose.model('Pic', PicSchema)
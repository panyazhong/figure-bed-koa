const mongoose = require('mongoose')
let Schema = mongoose.Schema

let PicSchema = new Schema({
  name: String,
  pic_url: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'pic_type'
  }
}, {
  timestamps: true
})

module.exports = PicSchema
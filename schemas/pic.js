const mongoose = require('mongoose')
let Schema = mongoose.Schema

let PicSchema = new Schema({
  name: String,
  pic_url: String,
  author_id: Schema.Types.ObjectId,
  type_id: Schema.Types.ObjectId
}, {
  timestamps: true
})

module.exports = PicSchema
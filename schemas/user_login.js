const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userLoginSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  token: String
})

module.exports = userLoginSchema
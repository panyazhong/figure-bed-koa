const mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
  user_name: String,
  nick_name: String,
  role: String,
  password: String
})

module.exports = UserSchema

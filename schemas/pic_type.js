const mongoose = require('mongoose')
const Schema = mongoose.Schema

let picTypeSchema = new Schema({
  type_name: String
})

module.exports = picTypeSchema
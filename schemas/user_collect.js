const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userCollectSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  pic: {
    type: mongoose.Types.ObjectId,
    ref: 'Pic'
  }
})

module.exports = userCollectSchema
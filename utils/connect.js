const mongoose = require('mongoose')
const DB_URL = "mongodb://dapan:123456@localhost:27017/figure-bed"

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

const connection = mongoose.connection

connection.on('connected', () => {
  console.log('connected success' + DB_URL)
})

connection.on('error', (err) => {
  console.log('connection error' + err)
})

connection.on('disconnected', () => {
  console.log('connection disconnected')
})

module.exports = mongoose
const upyun = require('upyun')
const md5 = require('md5')
const fs = require('fs')
const num2String = require('./num2String')

function Upload(file) {
  return new Promise(async (resolve, reject) => {
    const service = new upyun.Service('dapan-figure-bed', 'dapan', '43XRsmdLiixQkNDdZ4ge8ZmrTuB1KVxU')

    const client = new upyun.Client(service)

    // 上传文件
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    let { name, path } = file
    name = `${md5(name.split('.')[0])}.${name.split('.')[1]}`
    const fileName = `image/${year}-${num2String(month)}-${num2String(day)}/${name}`

    var params = {
      'x-gmkerl-thumb': '/format/png'
    }

    client.putFile(fileName, fs.createReadStream(path), params)
      .then(resp => {
        if (!resp) {
          reject('upload error')
        } else {
          resolve(fileName)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
  
}

module.exports = Upload


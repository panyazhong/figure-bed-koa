const Router = require('koa-router')
const router = new Router()
const Upload = require('../../utils/uploadToUpyun')
const PicModel = require('../../models/pic')
const jwt = require('jsonwebtoken')
const config = require('../../utils/config')

router.get('/getPicList', async ctx => {
  let result = {}
  ctx.response.body = result
})

router.post('/upload', async (ctx) => {
  let { file } = ctx.request.files
  
  try {
    // let uploadResult = await Upload(file)

    // const token = ctx.header.authorization.split(' ')[1]
    // const payload = jwt.verify(token, config.token_secret, {
    //   complete: true
    // })
    // const { user_id } = payload.payload

    let { type_id } = ctx.request.body
    let params = {
      // author_id: user_id,
      name: file.name,
      type_id: type_id,
      pic_url: uploadResult
    }

    console.log(params)

    return

    try {
      let saveResult = await PicModel.create(params)
      if (saveResult._id) {
        result = {
          code: 20000,
          msg: 'upload success',

        }
      } else {
        result = {
          code: 20001,
          msg: 'upload fail'
        }
      }
    } catch (error) {
      result = {
        code: 50000,
        msg: error
      }
    }
    
    ctx.response.body = result
  
  } catch (error) {
    result = {
      code: 50000,
      msg: error
    }

    ctx.response.body = result
  }
})


module.exports = router
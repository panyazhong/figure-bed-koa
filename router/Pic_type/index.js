const PicTypeModel = require('../../models/pic_type')
const Router = require('koa-router')
const router = new Router()

/**
 * save pic_type
 * params: type_name
 * method: POST
 */
router.post('/savePicType', async ctx => {
  let { type_name } = ctx.request.body
  let result = {}
  try {
    let params = {
      type_name: type_name
    }
    let saveResp = await PicTypeModel.create(params) 
    if (saveResp._id) {
      result = {
        code: 20000,
        msg: 'save success'
      }
    } else {
      result = {
        code: 20001,
        msg: 'save failed'
      }
    }
  } catch (error) {
    result = {
      code: 50000,
      msg: error
    }
  }
  ctx.response.body = result
})

/**
 * get pic_type list
 * method: GET
 */
router.get('/getPicTypeList', async ctx => {
  let result = {}
  try {
    let getResp = await PicTypeModel.find()

    result = {
      code: 20000,
      data: getResp
    }
  } catch (error) {
    result = {
      code: 50000,
      msg: error
    }
  }

  ctx.response.body = result
})

module.exports = router
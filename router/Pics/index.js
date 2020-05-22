const Router = require('koa-router')
const router = new Router()
const Upload = require('../../utils/uploadToUpyun')
const PicModel = require('../../models/pic')
const jwt = require('jsonwebtoken')
const getUserInfoByCtx = require('../../utils/getUserInfoByToken')
const config = require('../../utils/config')

/**
 * 获取图片列表
 */
router.get('/getPicList', async ctx => {
  let result = {}
  try {
    let { _id, limit } = ctx.request.query
    let listRes
    if (!_id) {
      listRes = await PicModel.find({})
        .limit(Number(limit))
        .populate({ 
          path: 'author', 
          select: { user_name: 1 },
        })
        .populate({
          path: 'type',
          select: {
            type_name: 1
          }
        })
        .sort({
          '_id': -1
        })
    } else {
      listRes = await PicModel.find({
        '_id': {"$lt": _id}
      })
        .limit(Number(limit))
        .populate({
          path: 'author',
          select: { user_name: 1 },
        })
        .populate({
          path: 'type',
          select: {
            type_name: 1
          }
        })
        .sort({
          '_id': -1
        })
    }

    if (listRes.length > 0) {
      listRes.map(item => {
        item.pic_url = `${config.upyunUrl}${item.pic_url}`
      })
    }
    result = {
      code: 20000,
      data: listRes
    }
  } catch (error) {
    console.log(error)
    result = {
      code: 50000,
      msg: error
    }
  }

  ctx.response.body = result
})

/**
 * 用户上传图片
 */
router.post('/upload', async (ctx) => {
  let { file } = ctx.request.files
  
  try {
    let uploadResult = await Upload(file)

    const { user_id } = await getUserInfoByCtx(ctx)

    let { type } = ctx.request.body
    let params = {
      author: user_id,
      name: file.name,
      type: type,
      pic_url: uploadResult
    }

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

/**
 * 用户获取自己上传的图片
 */
router.get('/getPicSelf', async ctx => {
  const { _id, pageSize } = ctx.request.query
  const { user_id } = await getUserInfoByCtx(ctx)
  let result = {}

  try {
    let picRes = await PicModel.find({
      '_id': {"$lt": _id}
    })
      .populate({
        path: 'user',
        select: {
          user_name: 1
        }
      })
      .populate({
        path: 'pic',
        select: {
          pic_name: 1
        }
      })
      .limit(pageSize)
      .sort({
        '_id': -1
      })
      
    result = {
      code: 20000,
      data: picRes
    }
  } catch (error) {
    result = {
      code: 50000,
      msg: error
    }
  }

  ctx.response.body = result
})

router.post('/report', async ctx => {
  console.log(ctx.request.body)
})

module.exports = router
const Router = require('koa-router')
const userCollectModel = require('../../models/user_collect')

const router = new Router()

/**
 * 用户收藏图片
 * user ObjectId
 * pic ObjectId
 */
router.post('/collectPicById', async ctx => {
  const {user, pic} = ctx.request.body
  let result = {}
  let params = {
    user: user,
    pic: pic
  }
  try {
    let saveRes = await userCollectModel.create(params)

    if (saveRes._id) {
      result = {
        code: 20000
      }
    } else {
      result = {
        code: 20001,
        msg: '收藏失败'
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


module.exports = router
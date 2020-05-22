const jwt = require('jsonwebtoken')
const config = require('./config')
const getTokenInfoByCtx = require('./getUserInfoByToken')
const userLoginModel = require('../models/user_login')

const checkToken = function () {
  return async (ctx, next) => {
    if (ctx.request.url.search('report') != -1) {
      console.log(ctx.request.body)
    }
    if (config.apiWithPath.some(item => ctx.request.url.search(item) > -1)) {
      await next()
    } else {
      let result ={}
      try {
        const userInfo = await getTokenInfoByCtx(ctx)

        const { exp, user_id, token } = userInfo
        // 验证用户token是否是最新的
        let findResp = await userLoginModel.find({
          user_id: user_id,
          token: token
        })
        if (findResp.length === 0) {
          result = {
            code: 50011,
            msg: '用户已在其他地方登陆，请重新登陆'
          }
          ctx.response.body = result
        } else {
          if (exp * 1000 < new Date().getTime()) {
            result = {
              code: 50012,
              msg: 'token过期，请重新登陆！'
            }
            ctx.response.body = result
          } else {
            await next()
          }
        }
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          result = {
            code: 50012,
            msg: error.message
          }
        } else {
          result = {
            code: 50013,
            msg: 'token错误，请重新登陆！'
          }
        }

        ctx.response.body = result
      }
      
    }
    
  }
}

module.exports = checkToken
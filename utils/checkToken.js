const jwt = require('jsonwebtoken')
const config = require('./config')
const userLoginModel = require('../models/user_login')

const checkToken = function () {
  return async (ctx, next) => {
    if (ctx.request.url.search('/login') !== -1 || ctx.request.url.search('/register') !== -1 || ctx.request.url.search('/upload/') !== -1) {
      await next()
    } else {
      if (ctx.request.header && ctx.request.header.authorization) {
        const parts = ctx.header.authorization.split(' ')
        if (parts.length === 2) {
          const scheme = parts[0];
          const token = parts[1];
          
          if (/^Bearer$/i.test(scheme)) {
            try {
              let result = {}

              //jwt.verify方法验证token是否有效
              try {
                let payload = jwt.verify(token, config.token_secret, {
                  complete: true
                });
                const { exp, user_id } = payload.payload
                // 验证用户token是否是最新的
                let findResp = await userLoginModel.find({
                  user_id: user_id,
                  token: token
                })
                if (findResp.length === 0) {
                  result = {
                    code: 50000,
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
                console.log('token error !!!')
                console.log(error.message)
              }
             
            } catch (error) {
              let result = {}
              if (error.name === 'TokenExpiredError') {
                result = {
                  code: 50012,
                  msg: 'token过期，请重新登陆！'
                }
              } else {
                result = {
                  code: 50013,
                  msg: 'token错误，请重新登陆！'
                }
              }
              ctx.response.body = result  
            }
          } else {
            let result = {
              code: 50014,
              msg: 'token异常，请先登录！'
            }
            ctx.response.body = result  
          }
        } 
      } else {
        let result = {
          code: 50014,
          msg: '尚未登陆，请先登录！'
        }
        ctx.response.body = result
      }
    }
    
  }
}

module.exports = checkToken
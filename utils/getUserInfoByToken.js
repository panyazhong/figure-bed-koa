const jwt = require('jsonwebtoken')
const config = require('./config')

const getTokenInfoByCtx = function (ctx) {
  return new Promise((resolve, reject) => {
    if (ctx.request.header && ctx.request.header.authorization) {
      const parts = ctx.header.authorization.split(' ')
      if (parts.length === 2) {
        const scheme = parts[0];
        const token = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          try {
            const { payload } = jwt.verify(token, config.token_secret, {
              complete: true
            })

            const { user_id, exp } = payload
            resolve( {
              user_id,
              exp,
              token
            })
          } catch (error) {
            reject(error)
          }
        }
      }
    } else {
      reject({
        code: 50014,
        msg: '尚未登陆，请先登录！'
      })
    }
  })
  
}
module.exports = getTokenInfoByCtx

const Router = require('koa-router')
const router = new Router()
const userModel = require('../../models/user')
const userLoginModel = require('../../models/user_login')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const getUserInfoByCtx = require('../../utils/getUserInfoByToken') 
const config = require('../../utils/config') 

router.post('/login', async ctx => {
  let result = {}
  const {user_name, password} = ctx.request.body
  let resp = await userModel.find({
    user_name: user_name,
    password: md5(password)
  })
  if (resp.length > 0) {
    const user = {
      user_id: resp[0]._id
    }
    let token = jwt.sign(user, config.token_secret, {expiresIn: '3h'})
    try {
      let user_login = {
        user_id: user.user_id,
        token: token
      }

      let updateResp = await userLoginModel.findOneAndUpdate({user_id: user_login.user_id}, {token: token}, {
        new: true,
        returnNewDocument: true,
        upsert: true
      })
      if (updateResp._id) {
        result = {
          code: 20000,
          token: token,
          msg: '登陆成功'
        }
      }      
    } catch (error) {
      result = {
        code: 50000,
        msg: error
      }
    }
  } else {
    result = {
      code: 50000,
      msg: '用户名密码不匹配'
    }
  }
  ctx.response.body = result
})

router.post('/register', async ctx => {
  let result = {}
  let params = ctx.request.body
  let findParams = {
    user_name: params.user_name
  }
  let findResp = await userModel.find(findParams)
  if (findResp.length > 0) {
    result = {
      code: 20001,
      msg: "用户名已被注册"
    }
  } else {
    params.password = md5(params.password)
    let resp = await userModel.create(params)
    if (resp._id) {
      result = {
        code: 20000,
        msg: "注册成功"
      }
    } else {
      result = {
        code: 50000,
        msg: "注册失败"
      }
    }
  }
  
  ctx.response.body = result
  
})

/**
 * 获取用户信息
 */
router.get('/getUserInfo', async ctx => {
  const { user_id } = await getUserInfoByCtx(ctx)
  try {
    const userInfo = await userModel.find({
      "_id": user_id
    })
    if (userInfo.length > 0) {
      let {_id, user_name, role, nick_name} = userInfo[0]
      result = {
        code: 20000,
        data: {
          user_name: user_name,
          user_id: _id,
          role: role,
          nick_name: nick_name
        }
      }
    } else {
      result = {
        code: 20001,
        data: []
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
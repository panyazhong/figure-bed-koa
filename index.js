const Koa = require('koa')
const App = new Koa()
const Router = require("koa-router")
const router = new Router()
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const routes = require('./router')
const checkToken = require('./utils/checkToken')
const upyun = require('upyun')

router.use('/api', routes.routes())

App.use(koaBody({
    multipart: true,  // 支持文件上传
    formidable: {
      maxFileSize: 200 * 1024 * 1024,   // 设置上传文件大小最大限制，默认2M
      multipart: true  // 支持 multipart-formdate 的表单
    }
  }))
  .use(cors())
  .use(checkToken())
  .use(router.routes())
  .use(router.allowedMethods())
App.listen(3000, () => {
  console.log('run on port 3000')
})
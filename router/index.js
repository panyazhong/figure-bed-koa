const Router = require('koa-router')
const router = new Router()

const User = require('./User')
const Pics = require('./Pics')
const PicTypes = require('./Pic_type')
const UserCollect = require('./User_collect')

router.use('/user', User.routes())

router.use('/pic_types', PicTypes.routes())

router.use('/pic', Pics.routes())

router.use('/user_collect', UserCollect.routes())

module.exports = router
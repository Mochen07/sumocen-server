'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api')
router.use(jwtMiddleware)

// article
router.post('/article/addEdit', controllers.article.addEdit)
router.post('/article/bannerList', controllers.article.bannerList)

module.exports = router

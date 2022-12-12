'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api')
router.use(jwtMiddleware)

// article
router.post('/article/addEdit', controllers.article.addEdit)
router.get('/article/bannerList', controllers.article.bannerList)
router.get('/article/list', controllers.article.list)

module.exports = router

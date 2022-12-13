'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.prefix('/api')
// user
router.post('/user/login', controllers.login.login)
router.post('/user/register', controllers.login.register)

// article
router.get('/article/bannerList', controllers.article.bannerList)
router.get('/article/list', controllers.article.list)
router.post('/article/like', controllers.article.like)

module.exports = router

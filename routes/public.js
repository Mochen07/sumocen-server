'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.prefix('/api')
// user
router.post('/user/login', controllers.login.login)
router.post('/user/register', controllers.login.register)
// article
router.post('/article/addEdit', controllers.article.addEdit)

module.exports = router

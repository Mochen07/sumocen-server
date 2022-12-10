'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.prefix('/api')
// user
router.post('/user/login', controllers.login.login)
router.post('/user/register', controllers.login.register)

module.exports = router

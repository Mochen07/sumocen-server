'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api')
router.use(jwtMiddleware)

// article
router.post('/article/addEdit', controllers.article.addEdit)
router.post('/article/delete', controllers.article.delete)
// tag
router.post('/tag/addEdit', controllers.tag.addEdit)
router.get('/tag/list', controllers.tag.list)
router.post('/tag/delete', controllers.tag.delete)
// tool
router.post('/upload', controllers.tool.upload)

module.exports = router

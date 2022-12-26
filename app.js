'use strict'

const Koa = require('koa')
// 将post请求的参数转为json格式, 文件内容解析
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')
const cors = require('koa2-cors')
// 设置Http头保障应用程序安全
const helmet = require("koa-helmet")

const config = require('./config')
const publicRouter = require('./routes/public')
const privateRouter = require('./routes/private')
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandler, responseHandler } = require('./middlewares/response')
const { corsHandler } = require('./middlewares/cors')

const app = new Koa()
console.log('环境', process.env.NODE_ENV)
// Logger
app.use(loggerMiddleware)

// Error Handler
app.use(errorHandler)

// Global Middlewares
app.use(koaBody({ 
  formidable: {
    uploadDir: config.uploadDir
  },
  multipart: true
}))
app.use(koaStatic(config.publicDir))

// Helmet
app.use(helmet())

// Cors
app.use(cors(corsHandler))

// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(privateRouter.routes(), privateRouter.allowedMethods())

// Response
app.use(responseHandler)

module.exports = app

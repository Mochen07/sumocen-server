'use strict'

const path = require('path')

module.exports = {
  port: '3000',
  secret: '%s$u@m^o&c*e)n',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  mongoDB: {
    database: 'survey', // 自我勘察
    username: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 27017
  }
}

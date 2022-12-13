'use strict'

const { logger } = require('./logger')

/**
 * @description 统一接口返回格式
 * @param ctx
 * @return { code: 0, msg: any data: any }
 * @todo code: 200 成功 204 服务器未处理; ctx.result中的内容最终回传给客户端
 */
const responseHandler = (ctx) => {
  if (ctx.result !== undefined) {
    ctx.type = ctx.type || 'json'
    ctx.body = {
      code: ctx.code || 200,
      msg: ctx.msg || '请求成功',
      data: ctx.result
    }
  } else {
    ctx.type = 'json'
    ctx.body = {
      code: 204,
      msg: 'result undefined',
    }
  }
}

/**
 * @description 统一接口返回格式
 * @param ctx next
 * @return { code: error code, msg: error info }
 * @todo code: 200 成功 404 服务器未处理; 处理在其它middleware中出现的异常
 */
const errorHandler = (ctx, next) => {
  return next().catch(err => {
    if (err.code == null) {
      logger.error(err.stack)
    }
    ctx.body = {
      code: err.code || -1,
      data: null,
      msg: err.message.trim()
    }

    ctx.status = 200 // 保证返回状态是 200, 这样前端不会抛出异常
    return Promise.resolve()
  })
}

module.exports = {
  responseHandler,
  errorHandler
}

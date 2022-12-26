'use strict'

class CodedError extends Error {
  constructor (message = '未知错误', code = -1) {
    super(message)
    this.code = code
  }
}

/**
 * @description 错误状态的构造函数
 * @param message 202 400 403
 * @todo ...
 */
module.exports = {
  CodedError,
  /**
   * 已接受。已经接受请求，但未处理完成。
   */
  AcceptedError: class AcceptedError extends CodedError {
    constructor (message = '无效的参数') {
      super(message, 202)
    }
  },
  /**
   * 客户端请求的语法错误，服务器无法理解
   */
  InvalidQueryError: class InvalidQueryError extends CodedError {
    constructor (message = '无效的参数') {
      super(message, 400)
    }
  },
  /**
   * 服务器理解请求客户端的请求，但是拒绝执行此请求
   */
  ForbiddenError: class ForbiddenError extends CodedError {
    constructor (message = '拒绝访问') {
      super(message, 403)
    }
  },
  /**
   * 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面
   */
  NotFoundError: class NotFoundError extends CodedError {
    constructor (message = '未找到对应资源') {
      super(message, 404)
    }
  },
}

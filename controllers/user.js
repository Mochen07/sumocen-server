'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const userServices = require('../services').user
const { InvalidQueryError, AcceptedError } = require('../lib/error')
const login = {}

// 注册
login.register = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    throw new InvalidQueryError()
  }
  const user = await userServices.add({
    username,
    password,
  })
  // result 1 用户已注册
  if (!user) {
    throw new AcceptedError('用户已注册')
  } else {
    ctx.result = user
    ctx.msg = '注册成功'
  }
  return next()
}

// 登录
login.login = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    throw new InvalidQueryError()
  }
  const user = await userServices.login({
    username: username,
    password: password,
  })
  if (!user) {
    ctx.code = -1
    ctx.result = ''
    ctx.msg = '用户名或密码不正确'
  } else {
    ctx.result = jwt.sign(
      {
        data: user._id,
        // 设置 token 过期时间 60 seconds * 60 minutes = 1 hour
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      config.secret
    )
    ctx.msg = '登录成功'
  }
  return next()
}

module.exports = login

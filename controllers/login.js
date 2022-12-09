'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const userServices = require('../services').user
const { InvalidQueryError } = require('../lib/error')
const login = {}

// 注册
login.register = async (ctx, next) => {
  const {userName, password} = ctx.request.body
  if (!userName || !password) {
    throw new InvalidQueryError()
  }
  const user = await userServices.add({
    userName, password,
  })
  // result 1 用户已注册
  if (!user) {
    ctx.result = '1'
    ctx.msg = '用户已注册'
  } else {
    ctx.result = user
    ctx.msg = '注册成功'
  }
  return next()
}

// 登录
login.login = async (ctx, next) => {
    const {userName, password} = ctx.request.body
    if (!userName || !password) {
        throw new InvalidQueryError()
    }
    const user = await userServices.login({
        userName: userName,
        password: password
    })
    if (!user) {
        ctx.result = ''
        ctx.msg = '用户名或密码不正确'
    } else {
        ctx.result = jwt.sign({
            data: user._id,
            // 设置 token 过期时间 60 seconds * 60 minutes = 1 hour
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }, config.secret)
        ctx.msg = '登录成功'
    }
    return next()
}

module.exports = login

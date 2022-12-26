'use strict'
const articleServices = require('../services').article
const article = {}

// 新增编辑
article.addEdit = async (ctx, next) => {
  const {title, description, content, poster, tag, keywords, _id} = ctx.request.body
  const result = await articleServices.addEdit({
    title, description, content, poster, tag, keywords, _id
  })
  if (result._id) { // 新增
    ctx.result = result
    ctx.msg = '添加成功'
  } else {
    ctx.result = _id
    ctx.msg = '编辑成功'
  }
  return next()
}

// banner
article.bannerList = async (ctx, next) => {
  const result = await articleServices.bannerList()
  ctx.result = result
  return next()
}

// list
article.list = async (ctx, next) => {
  const {page} = ctx.request.query
  const result = await articleServices.list({page:Number(page)})
  ctx.result = result
  return next()
}

// like
article.like = async (ctx, next) => {
  const {_id} = ctx.request.body
  const result = await articleServices.like({_id})
  if (result.n===0) {
    ctx.result = _id
    ctx.code = 202
    ctx.msg = '未找到当前文章内容'
  } else {
    ctx.result = _id
  }
  return next()
}

// detail
article.detail = async (ctx, next) => {
  const {_id} = ctx.request.body
  const result = await articleServices.detail({_id})
  ctx.result = result
  return next()
}

module.exports = article
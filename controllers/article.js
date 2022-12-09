'use strict'
const articleServices = require('../services').article
const article = {}

article.addEdit = async (ctx, next) => {
  const {title, description, content, poster, tag, keywords, _id} = ctx.request.body
  const current = await articleServices.addEdit({
    title, description, content, poster, tag, keywords, _id
  })
  if (!current) {
    ctx.result = title
    ctx.msg = '标题重复'
    return next()
  }
  if (current.id) { // 新增
    ctx.result = current
    ctx.msg = '添加成功'
  } else {
    ctx.result = _id
    ctx.msg = '编辑成功'
  }
  return next()
}

module.exports = article
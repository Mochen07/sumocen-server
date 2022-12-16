'use strict'
const tagServices = require('../services').tag
const tag = {}

// 新增编辑
tag.addEdit = async (ctx, next) => {
  let {_id, name, icon} = ctx.request.body
  const result = await tagServices.addEdit({
    _id, name, icon
  })
  if (!result) {
    ctx.result = name
    ctx.msg = '名称已存在'
    return next()
  }
  if (result._id) { // 新增
    ctx.result = result
    ctx.msg = '添加成功'
  } else if (result.n===0) {
    ctx.result = _id
    ctx.code = 202
    ctx.msg = '未找到需要更新的内容'
  } else {
    ctx.result = _id
    ctx.msg = '编辑成功'
  }
  return next()
}

module.exports = tag
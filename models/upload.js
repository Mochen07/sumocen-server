'use strict'

module.exports = {
  name: 'upload',
  schema: {
    id: Number, // uuid
    name: String, // 上传的文件名称
    size: Number, // 文件大小
    ctx: String, // 后缀
    url: { type: String, unique: true }, // 文件地址
    createdTime: { type: Date, default: Date.now() }, // 创建时间
    updatedTime: { type: Date, default: Date.now() }, // 最后更新时间
  },
}
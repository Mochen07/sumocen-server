'use strict'

module.exports = {
  name: 'tag',
  schema: {
    id: Number,
    name: { type: String, unique: true },
    icon: { type: String, unique: true },
    createdTime: { type: Date, default: Date.now() }, // 创建时间
    updatedTime: { type: Date, default: Date.now() }, // 最后更新时间
  }
}
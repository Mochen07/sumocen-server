'use strict'

module.exports = {
  name: 'tag',
  schema: {
    id: Number,
    name: { type: String, unique: true },
    icon: { type: String },
    createdTime: { type: Date, default: Date.now() }, // 创建时间
    updatedTime: { type: Date, default: Date.now() }, // 最后更新时间
    recycle: { type: Boolean, default: false}, // 回收
  }
}
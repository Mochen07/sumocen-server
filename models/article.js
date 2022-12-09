'use strict'

module.exports = {
  name: 'article',
  schema: {
    uuid: String, // uuid
    title: String, // 标题
    description: String, // 表述
    content: String, // 富文本内容
    poster: String, // 海报
    tag: Array, // 标签
    keywords: Array, // 关键词
    views: { type: Number, default: 0 }, // 浏览量
    likes: { type: Number, default: 0 }, // 喜欢量
    comment: { type: Number, default: 0 }, // 评论量
    createdTime: { type: Date, default: Date.now() }, // 创建时间
    updatedTime: { type: Date, default: Date.now() }, // 最后更新时间
  },
}

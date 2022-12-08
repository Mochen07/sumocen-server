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
    views: Number, // 浏览量
    likes: Number, // 喜欢量
    comment: Number, // 评论量
  }
}
const Article = require('../models/index').getModel('article')

const article = {
  // 新增文章
  async addEdit (data) {
    if (data._id) { // 编辑
      const isOnly = await Article.findOne({_id: {$ne: data._id}, title: data.title})
      if (isOnly&&isOnly.length) {return false}
      let result = await Article.update(
        {_id: data._id},
        {
          $set: {
            ...data,
            updatedTime: new Date(),
          }
        }
      )
      return result
    } else {// 新增
      const isOnly = await Article.findOne({title: data.title})
      if (isOnly) { return false }
      let current = new Article({
        ...data
      })
      let result = await current.save()
      return result
    }
  },
  // banner
  async bannerList () {
    const result = await Article.find({},{_id:1,title:1,poster:1,createdTime:1}).limit(7).sort({createdTime:-1})
    return result
  },
  // list
  async list (data) {
    const list = await Article.find({}, {_id:1,title:1,description:1,poster:1,views:1,likes:1,comment:1,updatedTime:1}).skip((data.page-1)*10).limit(10)
    const total = await Article.find().count()
    return {
      list,
      pagination: {
        currentPage: data.page,
        total,
      }
    }
  },
  // like
  async like (data) {
    const result = await Article.update(
      {_id: data._id},
      {
        $inc: {likes: 1}
      }
    )
    return result
  },
  // detail
  async detail (data) {
    const result = await Article.findOne({_id: data._id})
    await Article.update(
      {_id: data._id},
      {
        $inc: {views: 1}
      }
    )
    const nextArticle = await Article.findOne({ _id: { $gt: data._id } }, {title:1}).sort({createdTime: 1})
    const lastArticle = await Article.findOne({ _id: { $lt: data._id } }, {title:1}).sort({createdTime: -1})
    return {
      data: result,
      other: {
        nextArticle,
        lastArticle,
      }
    }
  },
}

module.exports = article
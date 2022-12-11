const Article = require('../models/index').getModel('article')

const article = {
  // 新增文章
  async addEdit (data) {
    if (data._id) { // 编辑
      const isRepetitionTitle = await Article.findOne({_id: {$ne: data._id}, title: data.title})
      if (isRepetitionTitle&&isRepetitionTitle.length) {return false}
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
      const isFindTitle = await Article.findOne({title: data.title})
      if (isFindTitle) { return false }
      let current = new Article({
        ...data
      })
      let result = await current.save()
      return result
    }
  },
  // banner
  async bannerList () {
    let result = await Article.find({},{_id:1,title:1,poster:1,createdTime:1}).limit(7).sort({createdTime:-1})
    return result
  }
}

module.exports = article
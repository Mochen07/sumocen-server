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
}

module.exports = article
const Tag = require('../models/index').getModel('tag')
const Article = require('../models/index').getModel('article')


const tag = {
  // 新增编辑
  async addEdit (data) {
    if (data._id) { // 编辑
      const isOnly = await Tag.findOne({_id: {$ne: data._id}, name: data.name})
      if (isOnly&&isOnly.length) {return false}
      let result = await Tag.update(
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
      const isOnly = await Tag.findOne({name: data.name})
      if (isOnly) { return false }
      let current = new Tag({
        ...data
      })
      let result = await current.save()
      return result
    }
  },
  // 列表
  async list () {
    let result = await Tag.find({}, {_id:1,name:1,icon:1})
    if (result && result.length) {
      for (let i = 0; i < result.length; i++) {
        result[i]._doc.useNum = await Article.find({tag: {$in: [String(result[i]._doc._id)]}}).count()
      }
    }
    return result
  }
}

module.exports = tag
const Tag = require('../models/index').getModel('tag')

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
}

module.exports = tag
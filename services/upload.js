'use strict'
const Upload = require('../models/index').getModel('upload')
const upload = {
  // 添加一条上传记录
  async addUploadInfo (data) {
    let current = new Upload({
      ...data
    })
    let result = await current.save()
    return result
  }
}

module.exports = upload
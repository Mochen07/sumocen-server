const User = require('../models/index').getModel('user')

const user = {
    async login (data) {
      let result = await User.findOne(data)
      return result
    },
    // 注册一个用户
    async add (data) {
      let isFindOne = await User.findOne(data)
      if (isFindOne) {
        return false
      }
      let current = new User()
      current.userName = data.userName
      current.password = data.password
      let result = await current.save()
      return result
    }
}

module.exports = user

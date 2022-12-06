const User = require('../models/index').getModel('user')

const user = {
    async login (userData) {
      let result = await User.findOne(userData)
      return result
    },
    // 注册一个用户
    async add (userData) {
      let isFindOne = await User.findOne(userData)
      if (isFindOne) {
        return false
      }
      let user = new User()
      user.userName = userData.userName
      user.password = userData.password
      let result = await user.save()
      return result
    }
}

module.exports = user

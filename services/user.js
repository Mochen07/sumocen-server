const User = require('../models/index').getModel('user')

const user = {
    async login (userData) {
        let result = await User.findOne(userData)
        console.log(result)
        return result
    }
}

module.exports = user

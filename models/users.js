const User = require('../lib/mongo').User
module.exports = {
  create: function create (user) {//创建用户
    return User.create(user).exec()
  }
}

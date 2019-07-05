const User = require('../lib/mongo').User
module.exports = {
  create: function create (user) {//创建用户
    return User.create(user).exec()
  },
  //4.8 登录
  getUserByName: function getUserByName (name) {
    return User
      .findOne({ name: name })
      .addCreatedAt()
      .exec()
  }
}

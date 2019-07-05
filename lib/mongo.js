const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

//User model
exports.User = mongolass.model('User', {
  name: { type: 'string', required: true },
  password: { type: 'string', required: true},
  avatar: { type: 'string', requried: true },
  gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x'},
  bio: { type: 'string', required: true }
})
exports.User.index({ name: 1 }, { unique: true }).exec()

//4.8登录
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

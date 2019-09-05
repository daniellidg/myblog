module.exports = app => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://localhost:27017/myblog', {
    useNewUrlParser: true
  })

  const models = require('require-all')(__dirname + '/../models')
}
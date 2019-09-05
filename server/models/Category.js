const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String}
})

module.exports = mongoose.model('Category', schema)
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String}
})

// schema.virtual('newsList', {
//   localField: '_id',
//   foreignField: 'categories',
//   justOne: false,
//   ref: 'Article'
// })

module.exports = mongoose.model('Category', schema, 'categories')
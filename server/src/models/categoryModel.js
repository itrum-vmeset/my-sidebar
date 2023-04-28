const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  id: {type: String},
  position: {type: Number}
})

module.exports = mongoose.model('Category', CategorySchema)

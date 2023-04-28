const mongoose = require('mongoose')

const BrandSchema = new mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  icon: {type: String},
  margin: {type: Number}
})

module.exports = mongoose.model('Brand', BrandSchema)

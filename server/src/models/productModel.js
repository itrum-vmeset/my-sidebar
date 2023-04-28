const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  nameFrom1C: {type: String},
  codeFrom1C: {type: String},
  price: {type: String},
  volume: {type: String},
  isReady: {type: Boolean},
  isRetailAllowed: {type: Boolean},
  brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand'},
  images: [{type: String}],
  description: {type: String},
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  subCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'},
})

module.exports = mongoose.model('Product', ProductSchema)

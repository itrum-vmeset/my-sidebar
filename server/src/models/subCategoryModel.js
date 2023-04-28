const mongoose = require('mongoose')

const SubCategorySchema = new mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  position: {type: Number},
  catalog_product: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('SubCategory', SubCategorySchema)

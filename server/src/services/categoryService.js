const categoryModel = require('../models/categoryModel')

class CategoryService {
  async getAll() {
    const categories = await categoryModel.find()
    return categories
  }

  async create(id, name, position) {
    const category = await categoryModel.create({
      id, name, position
    })
    return category
  }

  async delete(id) {
    const category = await categoryModel.findByIdAndRemove({
      id
    })
    return category
  }

  // async update(id, category) {
  //   const newCategory = await categoryModel.findByIdAndUpdate({
  //     id, device, {new: true}
  //   })
  //   return newCategory
  // }
}

module.exports = new CategoryService()

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
}

module.exports = new CategoryService()

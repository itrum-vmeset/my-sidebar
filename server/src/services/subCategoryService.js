const subCategoryModel = require('../models/subCategoryModel')
const categoryModel = require('../models/categoryModel')
const CategoryDto = require('../dto/categoryDto')
const ApiError = require('../error/ApiError')
class SubCategoryService {

  async getAll() {
    const subCategories = await subCategoryModel.find()
    return subCategories
  }

  async create(id, name, position, categoryId) {
    const category = await categoryModel.findOne({id: categoryId})
    if(!category) {
      throw ApiError.badRequest(`Категории с таким ID не найдено`)
    }
    const categoryDto = new CategoryDto(category)

    const subCategory = await subCategoryModel.create({
      id, name, position, catalog_product: categoryDto.id
    })
    return subCategory
  }
}

module.exports = new SubCategoryService()
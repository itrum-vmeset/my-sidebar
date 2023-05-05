const subCategoryModel = require('../models/subCategoryModel')
const categoryModel = require('../models/categoryModel')
const CategoryDto = require('../dto/categoryDto')
const ApiError = require('../error/ApiError')
class SubCategoryService {

  async getAll(catalog_product) {
    let subCategories    
    if(!catalog_product) {
      subCategories = await subCategoryModel.find()
    }
    if(catalog_product) {
      subCategories = await subCategoryModel.find({catalog_product})
    }
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
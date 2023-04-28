const CategoryDto = require('../dto/categoryDto')
const SubCategoryDto = require('../dto/subCategoryDto')
const BrandDto = require('../dto/brandDto')

const brandModel = require('../models/brandModel')
const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')
const subCategoryModel = require('../models/subCategoryModel')
const ApiError = require('../error/ApiError')

class ProductService {
  async getAll() {
    const products = await productModel.find()
    return products
  }

  async getOne(id) {
    const product = await productModel.findById(id)
    return res.json(product)
}

  async create(id, name, nameFrom1C, codeFrom1C, price, volume, isReady,
    isRetailAllowed, brandId, images, description, categoryId, subCategoryId) {

    const category = await categoryModel.findOne({id: categoryId})
    if(!category) {
      throw ApiError.badRequest(`Категории с таким ID не найдено`)
    }
    const categoryDto = new CategoryDto(category)
    
    const subCategory = await subCategoryModel.findOne({id: subCategoryId})
    if(!subCategory) {
      throw ApiError.badRequest(`Подкатегории с таким ID не найдено`)
    }
    const subCategoryDto = new SubCategoryDto(subCategory)

    const brand = await brandModel.findOne({id: brandId})
    if(!brand) {
      console.log(brandId)
      throw ApiError.badRequest(`Бренда с таким ID не найдено`)
    }
    const brandDto = new BrandDto(brand)

    const product = await productModel.create({
      id, name, nameFrom1C, codeFrom1C, price, volume, isReady, isRetailAllowed,
      brand: brandDto.id, images, description, category: categoryDto.id, subCategory: subCategoryDto.id
    })
    return product
  }
}

module.exports = new ProductService()
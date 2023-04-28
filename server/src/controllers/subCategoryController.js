const subCategoryService = require('../services/subCategoryService')

class subCategoryController {
  async create (req, res, next) {
    try {
      const {id, name, position, categoryId} = req.body
      const newSubCategory = await subCategoryService.create(id, name, position, categoryId)
      return res.json(newSubCategory)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req, res, next) {
      try {
          const subCategories = await subCategoryService.getAll()
          return res.json(subCategories)
      } catch (e) {
          next(e)
      }
  }
}

module.exports = new subCategoryController()
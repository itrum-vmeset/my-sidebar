const categoryService = require('../services/categoryService')

class categoryController {
  async create (req, res, next) {
    try {
      const {id, name, position} = req.body
      const newCategory = await categoryService.create(id, name, position)
      return res.json(newCategory)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req, res, next) {
      try {
        const categories = await categoryService.getAll()
        return res.json(categories)
      } catch (e) {
        next(e)
      }
  }


  // async update(req, res, next) {
  //   try {
  //     const category = req.body
  //     const newCategory = await categoryService.update(category.id, category)
  //     return res.json(newCategory)
  //   } catch (e) {
  //     next(e)
  //   }
  // }
  async delete(req, res, next) {
    try {
      const category = await categoryService.delete(req.params.id)
      return res.json(category)
  } catch (e) {
      next(e)
    }
  }
}

module.exports = new categoryController()
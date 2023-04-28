const ProductService = require('../services/productService')

class ProductController {
  async create (req, res, next) {
    try {
      const {id, name, nameFrom1C, codeFrom1C, price, volume, isReady,
      isRetailAllowed, brandId = "no-brand-id", 
      images, description, categoryId = "no-cat-id", subCategoryId = "no-subcat-id"} = req.body

      const product = await ProductService.create(
        id, name, nameFrom1C, codeFrom1C, price, volume, isReady,
        isRetailAllowed, brandId, images, description, categoryId, subCategoryId)
      return res.json(product)
    } catch (e) {
      next(e)
    }
  }

    async getAll(req, res, next) {
        try {
            const products = await ProductService.getAll()
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
      try {
          const product = await ProductService.getOne(req.params.id)
          return res.json(product)
      } catch(e) {
          next(ApiError.badRequest(e.message))
      }
  }
}

module.exports = new ProductController()
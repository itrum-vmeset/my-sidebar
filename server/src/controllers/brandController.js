const brandService = require('../services/brandService')

class brandController {
  async create (req, res, next) {
    try {
      const {id, name, icon, margin} = req.body
      const newBrand = await brandService.create(id, name, icon, margin)
      return res.json(newBrand)
    } catch (e) {
      next(e)
    }
  }

    async getAll(req, res, next) {
        try {
            const brands = await brandService.getAll()
            return res.json(brands)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new brandController()
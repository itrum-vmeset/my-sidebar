const brandModel = require('../models/brandModel')

class BrandService {
  async getAll() {
    const brands = await brandModel.find()
    return brands
  }

  async create(id, name, icon, margin) {
    const brand = await brandModel.create({
      id, name, icon, margin
    })
    return brand
  }
}

module.exports = new BrandService()

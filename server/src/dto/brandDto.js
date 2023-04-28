module.exports = class BrandDto {
  id
  name
  icon

  constructor(model){
    this.id = model._id
    this.name = model.name
    this.icon = model.icon
  }
}
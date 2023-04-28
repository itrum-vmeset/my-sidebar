module.exports = class SubCategoryDto {
  id
  name
  position
  
  constructor(model){
    this.id = model._id
    this.name = model.name
    this.position = model.position
  }
}
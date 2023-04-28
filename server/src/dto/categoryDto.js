module.exports = class CategoryDto {
  id
  name
  position
  
  constructor(model){
    this.id = model._id
    this.name = model.name
    this.position = model.position
  }
}
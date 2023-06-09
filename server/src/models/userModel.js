const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String}
})

module.exports = mongoose.model('User', UserSchema)
const mongoose = require('mongoose')

//sets up collection for users
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  score:{
    type: Number,
    default: 0,
  },
  session:{
    type:String,
    default: null,
  },
  school: {
    type: String,
    require: true,
  }
})

module.exports = mongoose.model('User' ,UserSchema )
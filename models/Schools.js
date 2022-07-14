const mongoose = require('mongoose')
//sets up collection for schools
const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    require : true,
  },
  members: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default:0,
  }
})

module.exports = mongoose.model('School' ,SchoolSchema )
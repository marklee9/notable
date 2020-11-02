const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhysicianSchema = new Schema({
  firstName: {
    type: String,
    require: true,
    trim: true
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
}, {
  timestamps: true
});


module.exports = mongoose.model('physician', PhysicianSchema);
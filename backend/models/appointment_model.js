const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  physician_id: {
    type: Schema.Types.ObjectId,
    reg: 'physician',
    require: true
  },
  patientFirstName: {
    type: String, require: true
  },
  patientLastName: {
    type: String, require: true
  },
  kind: {
    type: String, require: true
  },
  date: {
    type: Date, require: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('appointment', AppointmentSchema);
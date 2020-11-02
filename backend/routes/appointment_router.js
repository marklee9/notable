const router = require('express').Router();
const AppointmentModel = require('../models/appointment_model');

router.route('/allAppointments').get((req, res) => {
  AppointmentModel.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json(error));
});

router.route('/:physician_id').get((req, res) => {
  const { physician_id } = req.params;
  AppointmentModel.find({ physician_id }).sort({date: 1})
    .then((appointments) => {
      return res.json(appointments.filter(isToday))
    });
});

router.route('/addAppointment').post((req, res) => {
  const {
    physician_id,
    patientFirstName,
    patientLastName,
    kind,
    date,
  } = req.body;

  const newAppointment = new AppointmentModel({
    physician_id,
    patientFirstName,
    patientLastName,
    kind,
    date,
  });

  newAppointment.save()
    .then(appointment => res.json(appointment))
    .catch(error => res.status(400).json(error));
});

const isToday = ({date}) => {
  const now = new Date();
  const argDate = new Date(date);
  return argDate.getDate() === now.getDate() &&
    argDate.getMonth() === now.getMonth() &&
    argDate.getFullYear() === now.getFullYear();
};

module.exports = router;
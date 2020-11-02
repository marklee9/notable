const router = require('express').Router();
const PhysicianModel = require('../models/physician_model');

router.route('/allPhysicians').get((req, res) => {
  PhysicianModel.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json(error));
});

router.route('/addPhysician').post((req, res) => {
  const {
    firstName,
    lastName,
    email,
  } = req.body;

  const newPhysician = new PhysicianModel({
    firstName,
    lastName,
    email,
  });

  newPhysician.save()
    .then(user => res.json(user))
    .catch(error => res.status(400).json(error));
});

module.exports = router;
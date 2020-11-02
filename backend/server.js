const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// Setup
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Port open: ${port}`);
});

// Connecting to MongoDB.
mongoose
  .connect(uri, {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB successfully connected!'))
  .catch(error => {
    console.log(`DB Connection Error: ${error.message}`);
});

// Routers
const physicianRouter = require('./routes/physician_router');
const appointmentRouter = require('./routes/appointment_router');

app.use('/physician', physicianRouter);
app.use('/appointment', appointmentRouter);

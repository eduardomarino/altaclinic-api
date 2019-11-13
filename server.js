const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');

// Route files
const user = require('./routes/user');
const patient = require('./routes/patient');
const appointment = require('./routes/appointment');
const appointmentHistory = require('./routes/appointment-history');
const clinicHistory = require('./routes/clinic-history');
const medicalRecord = require('./routes/medical-record');
const evaluation = require('./routes/evaluation');
const prescription = require('./routes/prescription');
const examRequest = require('./routes/exam-request');
const examResult = require('./routes/exam-result');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

// Mount routers
app.use('/api/v1/user', user);
app.use('/api/v1/patient', patient);
app.use('/api/v1/appointment', appointment);
app.use('/api/v1/appointment-history', appointmentHistory);
app.use('/api/v1/clinic-history', clinicHistory);
app.use('/api/v1/medical-record', medicalRecord);
app.use('/api/v1/evaluation', evaluation);
app.use('/api/v1/prescription', prescription);
app.use('/api/v1/exam-request', examRequest);
app.use('/api/v1/exam-result', examResult);

app.listen(PORT,
  console.log(`>>> Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);

const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');

// Route files
const user = require('./routes/user');
const patient = require('./routes/patient');
const appointment = require('./routes/appointment');

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

app.listen(PORT,
  console.log(`>>> Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);

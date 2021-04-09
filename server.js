const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const patients = require('./routes/patients');
const appointments = require('./routes/appointments');
const diagnoses = require('./routes/diagnoses');
const prescriptions = require('./routes/prescriptions');
const exams = require('./routes/exams');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// PORT definition
const PORT = process.env.PORT || 5000;

// Dev logging middleware and enables cors
if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

// CORS
app.use(cors());

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/patients', patients);
app.use('/api/v1/appointments', appointments);
app.use('/api/v1/diagnoses', diagnoses);
app.use('/api/v1/prescriptions', prescriptions);
app.use('/api/v1/exams', exams);

// Error handler
app.use(errorHandler);

const server = app.listen(PORT,
  console.log(`>>> Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`>>> Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

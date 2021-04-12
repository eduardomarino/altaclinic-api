const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/error');
const connectDB = require('./src/database/db');

// Load env vars
dotenv.config({ path: 'config.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./src/routes/authRoute');
const users = require('./src/routes/usersRoute');
const patients = require('./src/routes/patientsRoute');
const appointments = require('./src/routes/appointmentsRoute');
const diagnoses = require('./src/routes/diagnosesRoute');
const prescriptions = require('./src/routes/prescriptionsRoute');
const examinations = require('./src/routes/examinationsRoute');

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
app.use('/api/v1/examinations', examinations);

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

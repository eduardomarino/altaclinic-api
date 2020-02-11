const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const user = require('./routes/user');
const patient = require('./routes/patient');
const appointment = require('./routes/appointment');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/patient', patient);
app.use('/api/v1/appointment', appointment);

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

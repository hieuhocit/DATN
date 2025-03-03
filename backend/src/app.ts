// Importing packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importing db
import db from './db/index.js';

// Import middlewares
import ErrorHandler from './middlewares/ErrorHandler.js';

// Routes
import UserRoutes from './routes/UserRoutes.js';

// Configuring dotenv
dotenv.config();

// Express app
const app = express();

// Connect to database
db.connect(app);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', UserRoutes);

// Not found handler
app.use(ErrorHandler.notFoundError);

// Error handler
app.use(ErrorHandler.defaultError);

// Server
const PORT = process.env.PORT || 3000;

// Run if the database has connected
app.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

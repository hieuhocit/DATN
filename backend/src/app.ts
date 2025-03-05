// Importing packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Importing db
import db from './db/index.js';

// Import middlewares
import {
  defaultError,
  notFoundError,
} from './middlewares/errorHandlingMiddleware.js';

// Routes
import AuthRoutes from './routes/AuthRoutes.js';

// Configuring dotenv
dotenv.config();

// Express app
const app = express();

// Connect to database
db.connect(app);

// Middlewares
app.use(
  cors({
    origin: 'https://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', AuthRoutes);

// Not found handler
app.use(notFoundError);

// Error handler
app.use(defaultError);

// Server
const PORT = process.env.PORT || 3000;

// Run if the database has connected
app.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

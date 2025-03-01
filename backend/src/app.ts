// Importing express, dotenv, cors
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importing db
import db from './db/index.js';

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
app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Call API successfully!',
  });
});

// Server
const PORT = process.env.PORT || 3000;

app.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

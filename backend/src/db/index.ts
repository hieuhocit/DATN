import mongoose from 'mongoose';
import { Express } from 'express';

const db = {
  connect: function (app: Express) {
    const options = {
      maxPoolSize: 10,
    };

    const connectWithRetry = () => {
      mongoose
        .connect(process.env.DB_CONNECTION_STRING as string, options)
        .then(() => {
          console.log('Connected to MongoDB');
          app.emit('ready');
        })
        .catch((err) => {
          console.log('Error connecting to MongoDB', err);
          console.log('Retrying in 2 seconds');
          setTimeout(connectWithRetry, 2000);
        });
    };
    connectWithRetry();
  },
};

export default db;

import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const app = express();

    app.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads')),
    );
    app.use(express.json());
    app.use(router);

    app.listen(process.env.PORT, () => {
      console.log(
        `🚀 Server is running on http://localhost:${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB', err);
  });

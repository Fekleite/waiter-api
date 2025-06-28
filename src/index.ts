import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

const PORT = 3333;

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const app = express();

    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads')),
    );
    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB', err);
  });

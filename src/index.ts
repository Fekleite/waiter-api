import http from 'node:http';
import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { router } from './router';

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ Connected to MongoDB');

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

    server.listen(process.env.PORT, () => {
      console.log(
        `🚀 Server is running on http://localhost:${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB', err);
  });

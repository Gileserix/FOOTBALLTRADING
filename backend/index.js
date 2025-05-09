import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app.js';
import config from './config.js';
import path from 'path';
import connectDB from './src/loaders/mongo.js';

// Connect to MongoDB
connectDB();

const dirname = path.resolve();

// Create HTTP server
const server = http.createServer(app);

server.listen(config.port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
    process.exit(1);
  }
  console.log(`Server is running on http://localhost:${config.port}`);
});
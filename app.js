import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
// Import your routers
import path from "path";

import { usermake } from './routes/user-get.js';

const app = express();
// Use middleware
app.use(cors({
  origin: ["https://knowledge-hub-livid.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes

app.use('/api', usermake);

// MongoDB connection
const db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hubknow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Start server
const PORT = process.env.PORT || 8025;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
export default app;

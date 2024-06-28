import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
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
const dbUri = process.env.MONGODB_URI || 'mongodb+srv://akashpj77:yourpassword@knowledgehub.d6y0qhm.mongodb.net/knowledgehub?retryWrites=true&w=majority&appName=knowledgehub';

mongoose.connect(dbUri,{useNewUrlParser: true, useUnifiedTopology: true,})
 
// Start server
const PORT = process.env.PORT || 8025;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
export default app;

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

// MongoDB connection using Mongoose
const uri = process.env.MONGODB_URI || "mongodb+srv://hubknow:akash123@hubknow.2igobkl.mongodb.net/hubknow?retryWrites=true&w=majority&appName=hubknow";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of waiting indefinitely
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Start server
const PORT = process.env.PORT || 8025;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
export default app;

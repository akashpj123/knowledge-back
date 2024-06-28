import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin',
    required: [true, 'Role is required'],
  }

 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export { User };

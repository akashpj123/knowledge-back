import mongoose from 'mongoose';

// Profile Schema
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  dateOfBirth: {
    type: Date,
    
  },
  mobileNumber: {
    type: String, // Change to String to allow for leading zeros and international numbers
    required: [true, 'Mobile number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'], // Adjust regex based on expected format
  },
  address1: {
    type: String,
    required: [true, 'Address is required'],
  },
}, { timestamps: true });

// Create an index on userId for faster lookup
profileSchema.index({ userId: 1 });

const Profile = mongoose.model('Profile', profileSchema);

export { Profile };

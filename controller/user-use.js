import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';
import dotenv from 'dotenv';
dotenv.config();


// Signup admin
export const sign = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new User({
 
      name: name,
      email: email,
      password: hashedPassword,
      role: 'user',

    });

    await newuser.save();

    console.log('user registered successfully.');
    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const admin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new User({
 
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newuser.save();

    console.log('user registered successfully.');
    return res.status(201).json({ message: 'Admin registered successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login admin
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist.' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Passwords match, authentication successful
    console.log('Passwords match! User authenticated.');

    // Generate a token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_USER,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Authentication successful.', token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// Login admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist.' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Passwords match, authentication successful
    console.log('Passwords match! User authenticated.');

    // Generate a token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Authentication successful.', token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// Logout admin
export const logout = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    res.status(200).json({ message: 'Logged out successfully'});
  }
};
export const logoutadmin= (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    res.status(200).json({ message: 'Logged out successfully' });
    
  }
};
export const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password').lean();
    res.status(200).json(user);
    return user;
  } catch (error) {
    throw new Error('Error finding post: ' + error.message);
  }
}
export const getalluser = async (req, res) => {
  try {
    const users = await User.find().select('-password').lean();
    res.status(200).json(users);
    return users;
  } catch (error) { 
    throw new Error('Error finding post: ' + error.message);
  }
}
export const delectuser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
    return user;
  } catch (error) {
    throw new Error('Error finding post: ' + error.message);
  }
}

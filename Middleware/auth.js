import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const checkRole = (role) => (req, res, next) => {
  if (req.User.role !== role ) {
    res.status(403).send({ error: 'Access denied.' });
  }
  next();
}
export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_USER)||jwt.verify(token, process.env.JWT_SECRET_ADMIN);
      // Ensure that the decoded token contains the user ID
      if (!decoded || !decoded.id) {
        throw new Error('Invalid token');
      }
      // Set the user ID in req.userId
     console.log(decoded)
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

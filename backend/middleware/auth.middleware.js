import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'no token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select(
      // '-password_hash -refresh_token',
      '_id username native_language learning_languages',
    );
    if (!req.user) {
      return res.status(401).json({ message: 'user not found' });
    }
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ message: 'invalid token' });
  }
};

export default authMiddleware;

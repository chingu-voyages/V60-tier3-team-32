import jwt from 'jsonwebtoken';

const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch {
      // Continue without logging in
    }
  }
  next();
};

export default optionalAuth;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, native_language, learning_languages } =
      req.body;

    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res
        .status(409)
        .json({ message: 'Email or username already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password_hash,
      native_language,
      learning_languages,
    });
    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    const refresh_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    user.refresh_token = refresh_token;
    await user.save();

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      native_language: user.native_language,
      learning_languages: user.learning_languages,
      credits: user.credits,
      access_token,
      refresh_token,
      created_at: user.created_at,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

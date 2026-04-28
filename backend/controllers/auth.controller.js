import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, native_language, learning_languages } =
      req.body;

    if (!username || !email || !password || !native_language) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

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

    res
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        _id: user._id,
        username: user.username,
        email: user.email,
        native_language: user.native_language,
        learning_languages: user.learning_languages,
        credits: user.credits,
        access_token,
        created_at: user.created_at,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const isEmail = identifier.includes('@');

    const user = await User.findOne(
      isEmail ? { email: identifier } : { username: identifier },
    );
    if (!user) {
      return res.status(401).json({ message: 'incorrect user or password' });
    }
    const passwordVerification = await bcrypt.compare(
      password,
      user.password_hash,
    );
    if (!passwordVerification) {
      return res.status(401).json({ message: 'incorrect user or password' });
    }
    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    const refresh_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    user.refresh_token = refresh_token;
    await user.save();

    res
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ access_token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const refreshAccessToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refresh_token !== refresh_token) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    return res.status(200).json({ access_token });
  } catch (error) {
    return res
      .status(403)
      .json({ message: 'Invalid or expired refresh token' });
  }
};
export const logoutUser = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (refresh_token) {
      const user = await User.findOne({ refresh_token });

      if (user) {
        user.refresh_token = null;
        await user.save();
      }
    }

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

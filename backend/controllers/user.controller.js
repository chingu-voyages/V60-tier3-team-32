import User from '../models/user.model.js';

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      '-password_hash -refresh_token -__v',
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      photo_url: user.photo_url || null,
      bio: user.bio || null,
      native_language: user.native_language,
      learning_languages: user.learning_languages.map((l) => ({
        language: l.language,
        level: l.level,
      })),
      credits: user.credits,
      created_at: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

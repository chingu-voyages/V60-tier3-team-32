import postModel from '../models/post.model.js';
import User from '../models/user.model.js';
import userModel from '../models/user.model.js';
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

export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const { status, limit = 10, page = 1 } = req.query;

    const query = {
      'author._id': userId,
    };

    if (status) {
      query.status = status;
    }
    // console.log('query:', query);

    const posts = await postModel
      .find(query)
      .sort({ created_at: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.json({
      data: posts.map((post) => ({
        id: post._id,
        language: post.language,
        fluency_level: post.fluency_level,
        prompt: {
          id: post.prompt?._id,
          title: post.prompt?.title,
          description: post.prompt?.description,
        },
        preview: post.content.substring(0, 100) + '...',
        word_count: post.word_count,
        reading_time: post.reading_time,
        corrections_count: post.corrections_count,
        status: post.status,
        created_at: post.created_at,
      })),
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { bio, photo_url, native_language, learning_languages } = req.body;
    const IdUser = req.user.id;

    const user = await userModel.findById(IdUser);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const finalNativeLanguage = native_language ?? user.native_language;
    const finalLearningLanguages =
      learning_languages ?? user.learning_languages;

    const conflict = finalLearningLanguages.some(
      (l) => l.language === finalNativeLanguage,
    );

    if (conflict) {
      return res.status(400).json({
        message: 'A language cannot be both native and learning',
      });
    }

    if (bio) user.bio = bio;
    if (photo_url) user.photo_url = photo_url;
    if (native_language) user.native_language = native_language;
    if (learning_languages) user.learning_languages = learning_languages;

    await user.save();
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      photo_url: user.photo_url,
      bio: user.bio,
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

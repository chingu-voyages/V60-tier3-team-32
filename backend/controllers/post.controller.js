import postModel from '../models/post.model.js';
import userModel from '../models/user.model.js';
import { detectAll, toISO3 } from 'tinyld';
import Prompt from '../models/prompt.model.js';
import mongoose from 'mongoose';
import { toLanguageObject } from '../helpers/language.js';

export const createPost = async (req, res) => {
  try {
    const {
      content,
      language,
      fluency_level,
      prompt_id,
      status = 'draft',
    } = req.body;
    const author_id = req.user.id;

    if (!content || !language || !fluency_level || !prompt_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const prompt = await Prompt.findById(prompt_id);

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    const user = await userModel.findById(author_id);

    if (!user) {
      return res.status(401).json({ message: 'User not found. Please log in' });
    }

    const validLanguages = user.learning_languages.map((l) => l.language);

    if (!validLanguages.includes(language)) {
      return res
        .status(400)
        .json({ message: 'You can only post in your learning languages' });
    }

    const words = content.trim().split(/\s+/).filter(Boolean);
    const word_count = words.length;
    const reading_time = Math.max(1, Math.ceil(word_count / 200));

    let language_warning = null;

    if (words.length >= 3) {
      const results = detectAll(content);
      const best = results[0];

      if (best && best.accuracy > 0.5) {
        const detectedCode = toISO3(best.lang);

        if (detectedCode && detectedCode !== language) {
          const detectedLang = toLanguageObject(detectedCode);
          const declaredLang = toLanguageObject(language);

          language_warning = {
            detected_language: detectedLang,
            declared_language: declaredLang,
            message: `This looks like ${detectedLang.label}, but you selected ${declaredLang.label}`,
          };
        }
      }
    }

    const post = await postModel.create({
      language,
      fluency_level,
      content,
      word_count,
      reading_time,
      status,
      prompt: {
        _id: prompt._id,
        title: prompt.title,
        description: prompt.description,
        language: prompt.language,
      },
      author: {
        _id: user._id,
        username: user.username,
        profile_image: user.photo_url || '',
      },
    });

    return res.status(201).json({
      id: post._id,
      language: post.language,
      fluency_level: post.fluency_level,
      prompt: {
        id: post.prompt._id,
        title: post.prompt.title,
        description: post.prompt.description,
      },
      author: {
        id: post.author._id,
        username: post.author.username,
        photo_url: post.author.profile_image || '',
      },
      content: post.content,
      word_count: post.word_count,
      reading_time: post.reading_time,
      corrections_count: post.corrections_count,
      status: post.status,
      created_at: post.created_at,
      updated_at: post.updated_at,
      ...(language_warning && { language_warning }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const getPosts = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const filter = {};

//     if (req.query.status) {
//       filter.status = req.query.status;
//     }

//     if (req.query.correctable === 'true') {
//       const user = await userModel.findById(req.user.id);
//       // console.log('user:', user.username);
//       // console.log('learning_languages:', user.learning_languages);

//       filter.status = { $in: ['submitted', 'corrected'] };
//       filter['author._id'] = { $ne: new mongoose.Types.ObjectId(req.user.id) };
//       filter.language = user.native_language;
//     }

//     const total = await postModel.countDocuments(filter);
//     const posts = await postModel
//       .find(filter)
//       .skip(skip)
//       .limit(limit)
//       .sort({ created_at: -1 });

//     res.status(200).json({
//       data: posts.map((post) => ({
//         id: post._id,
//         language: post.language,
//         fluency_level: post.fluency_level,
//         prompt: post.prompt
//           ? {
//               id: post.prompt._id,
//               title: post.prompt.title,
//               description: post.prompt.description,
//             }
//           : null,
//         author: {
//           id: post.author._id,
//           username: post.author.username,
//           photo_url: post.author.profile_image || '',
//         },
//         preview: post.content.substring(0, 100) + '...',
//         word_count: post.word_count,
//         reading_time: post.reading_time,
//         corrections_count: post.corrections_count,
//         status: post.status,
//         created_at: post.created_at,
//       })),
//       pagination: {
//         total,
//         page,
//         limit,
//         total_pages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.correctable === 'true') {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const user = await userModel.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      filter.status = { $in: ['submitted', 'corrected'] };

      // 1. Must NOT be the author
      filter['author._id'] = { $ne: new mongoose.Types.ObjectId(req.user.id) };

      // 2. Must be in the user's native language
      filter.language = user.native_language;

      // 3. Must NOT have been already corrected by this user
      // This targets the 'corrector._id' inside your corrections array
      filter['corrections.corrector._id'] = {
        $ne: new mongoose.Types.ObjectId(req.user.id),
      };

      if (req.query.level) filter.fluency_level = req.query.level;
    }

    const total = await postModel.countDocuments(filter);
    const posts = await postModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    res.status(200).json({
      data: posts.map((post) => ({
        id: post._id,
        language: post.language,
        fluency_level: post.fluency_level,
        prompt: post.prompt
          ? {
              id: post.prompt._id,
              title: post.prompt.title,
              description: post.prompt.description,
            }
          : null,
        author: {
          id: post.author._id,
          username: post.author.username,
          photo_url: post.author.profile_image || '',
        },
        preview: post.content.substring(0, 100) + '...',
        word_count: post.word_count,
        reading_time: post.reading_time,
        corrections_count: post.corrections_count,

        // --- NEW FIELD ---
        // Mapping the corrections array to a simple array of IDs for the frontend
        correctors: post.corrections.map((c) => c.corrector._id.toString()),

        status: post.status,
        created_at: post.created_at,
      })),
      pagination: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }
    res.status(200).json({
      _id: post._id,
      author: {
        id: post.author._id,
        username: post.author.username,
        photo_url: post.author.profile_image || '',
      },
      language: post.language,
      fluency_level: post.fluency_level,
      word_count: post.word_count,
      reading_time: post.reading_time,
      prompt: {
        id: post.prompt._id,
        title: post.prompt.title,
        description: post.prompt.description,
      },
      content: post.content,
      corrections: post.corrections.map((c) => ({
        id: c._id,
        corrector: {
          id: c.corrector._id,
          username: c.corrector.username,
          photo_url: c.corrector.profile_image || '',
        },
        corrected_text: c.corrected_text,
        notes: c.notes,
        created_at: c.created_at,
      })),

      status: post.status,
      created_at: post.created_at,
      updated_at: post.updated_at,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    const post = await postModel.findById(idPost);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { language, fluency_level, content, status } = req.body;
    // console.log('body:', req.body);
    // console.log('incoming status:', req.body.status);
    // console.log('user id:', req.user.id);

    if (language) post.language = language;
    if (fluency_level) post.fluency_level = fluency_level;

    if (content) {
      post.content = content;

      const words = content.trim().split(/\s+/).filter(Boolean);
      post.word_count = words.length;
      post.reading_time = Math.max(1, Math.ceil(words.length / 200));
    }

    if (status !== undefined) {
      const allowedStatuses = ['draft', 'submitted'];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      post.status = status;
    }
    await post.save();

    res.status(200).json({
      id: post._id,
      language: post.language,
      fluency_level: post.fluency_level,
      prompt: post.prompt
        ? {
            id: post.prompt._id,
            title: post.prompt.title,
            description: post.prompt.description,
          }
        : null,
      content: post.content,
      word_count: post.word_count,
      reading_time: post.reading_time,
      corrections_count: post.corrections_count,
      status: post.status,
      created_at: post.created_at,
      updated_at: post.updated_at,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    const post = await postModel.findById(idPost);
    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }
    if (post.author._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await postModel.findByIdAndDelete(idPost);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAllPost = async (req, res) => {
  try {
    await TonModele.deleteMany({ language: { $size: 2 } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const submitPost = async (req, res) => {
  try {
    const idPost = req.params.id;
    const post = await postModel.findById(idPost);
    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }
    if (post.author_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (post.status === 'submitted') {
      return res.status(400).json('Post already submitted');
    }
    post.status = 'submitted';

    await post.save();

    const credits_earned = 1;
    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { $inc: { credits: credits_earned } },
      { new: true },
    );
    res.status(200).json({
      _id: post._id,
      status: post.status,
      credits_earned,
      credits_total: user.credits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCorrection = async (req, res) => {
  try {
    const { corrected_text, notes } = req.body;
    const postId = req.params.id;

    if (!corrected_text) {
      return res.status(400).json({ message: 'corrected_text is required' });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author._id.toString() === req.user.id) {
      return res
        .status(403)
        .json({ message: 'You cannot correct your own post' });
    }

    const user = await userModel.findById(req.user.id);

    const correction = {
      _id: new mongoose.Types.ObjectId(),
      corrector: {
        _id: user._id,
        username: user.username,
        profile_image: user.photo_url || '',
      },
      corrected_text,
      notes,
      created_at: new Date(),
    };

    post.corrections.push(correction);
    post.corrections_count = post.corrections.length;
    post.status = 'corrected';
    await post.save();

    res.status(201).json({
      id: correction._id,
      post_id: post._id,
      corrector: {
        id: user._id,
        username: user.username,
        photo_url: user.photo_url || '',
      },
      corrected_text: correction.corrected_text,
      notes: correction.notes,
      created_at: correction.created_at,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

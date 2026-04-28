import postModel from '../models/post.model.js';
import userModel from '../models/user.model.js';
import { detectAll, toISO3 } from 'tinyld';

export const createPost = async (req, res) => {
  try {
    const { content, language, prompt_id, status } = req.body;
    const author_id = req.user.id;

    if (!content || !language) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await userModel.findById(author_id);
    const validLanguages = user.learning_languages.map((l) => l.language);
    if (!validLanguages.includes(language)) {
      return res
        .status(400)
        .json({ message: 'You can only post in your learning languages' });
    }
    let language_warning = null;
    const words = content.trim().split(/\s+/);

    if (words.length >= 3) {
      const results = detectAll(content);
      const best = results[0];

      if (best && best.accuracy > 0.5) {
        const detectedCode = toISO3(best.lang);
        if (detectedCode && detectedCode !== language) {
          language_warning = `Content seems to be in "${detectedCode}" but you declared "${language}"`;
        }
      }
    }

    const post = await postModel.create({
      author_id,
      language,
      content,
      prompt_id,
      status,
    });

    res.status(201).json({
      _id: post._id,
      language: post.language,
      content: post.content,
      status: post.status,
      created_at: post.createdAt,
      ...(language_warning && { language_warning }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.language) {
      filter.language = req.query.language;
    }
    const total = await postModel.countDocuments(filter);
    const posts = await postModel
      .find(filter)
      .populate('author_id', '_id username')
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      total,
      page,
      limit,
      data: posts.map((post) => ({
        _id: post._id,
        author: post.author_id,
        language: post.language,
        content: post.content,
        correction_count: post.correction_count,
        created_at: post.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel
      .findById(id)
      .populate('author_id', '_id username');

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }
    res.status(200).json({
      _id: post._id,
      author: post.author_id,
      language: post.language,
      content: post.content,
      prompt_id: post.prompt_id,
      status: post.status,
      correction_count: post.correction_count,
      created_at: post.createdAt,
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
      return res.status(404).json({ message: 'post not found' });
    }
    if (post.author_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (post.status !== 'draft') {
      return res
        .status(400)
        .json({ message: 'only draft posts can be updated' });
    }
    const { language, content } = req.body;

    if (language) post.language = language;
    if (content) post.content = content;

    await post.save();
    res.status(200).json({
      _id: post._id,
      language: post.language,
      content: post.content,
      status: post.status,
      updated_at: post.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    const post = await postModel.findById(idPost);
    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }
    if (post.author_id.toString() !== req.user.id) {
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

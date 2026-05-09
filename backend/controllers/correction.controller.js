import postModel from '../models/post.model.js';

export const getMyCorrections = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await postModel
      .find({
        'corrections.corrector._id': userId,
      })
      .sort({ updatedAt: -1 });

    const corrections = posts.flatMap((post) => {
      const myCorrections = post.corrections.filter(
        (correction) => correction.corrector._id.toString() === userId,
      );

      return myCorrections.map((correction) => ({
        id: correction._id,

        post: {
          id: post._id,
          language: post.language,
          prompt: {
            title: post.prompt?.title,
          },
          author: {
            username: post.author?.username,
          },
          preview: post.content.substring(0, 120) + '...',
        },
        corrected_preview: correction.corrected_text.substring(0, 120) + '...',
        created_at: correction.created_at,
      }));
    });

    return res.status(200).json({
      data: corrections,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

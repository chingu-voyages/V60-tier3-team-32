import postModel from '../models/post.model.js';

export const getMyCorrections = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type = 'made' } = req.query; // 'made', 'received', or 'all'

    let query = {};

    if (type === 'all') {
      // Logic for Dashboard: Posts I corrected OR my posts corrected by others
      query = {
        $or: [
          { 'corrections.corrector._id': userId },
          { 
            'author._id': userId, 
            'corrections.corrector._id': { $ne: userId },
            'corrections_count': { $gt: 0 } 
          }
        ]
      };
    } else if (type === 'made') {
      query = { 'corrections.corrector._id': userId };
    } else {
      // 'received'
      query = { 
        'author._id': userId, 
        'corrections.corrector._id': { $ne: userId },
        'corrections_count': { $gt: 0 } 
      };
    }

    const posts = await postModel.find(query).sort({ updatedAt: -1 });

    const corrections = posts.flatMap((post) => {
      // Logic to determine which corrections to return within each post
      const targetCorrections = post.corrections.filter((c) => {
        const isMyCorrection = c.corrector._id.toString() === userId;
        
        if (type === 'all') return true; // Keep all corrections for the mixed feed
        if (type === 'made') return isMyCorrection;
        return !isMyCorrection; // 'received'
      });

      return targetCorrections.map((correction) => ({
        id: correction._id,
        // Determine type per item for the 'all' feed
        type: correction.corrector._id.toString() === userId ? 'made' : 'received',
        post: {
          id: post._id,
          language: post.language,
          prompt: { title: post.prompt?.title },
          author: { username: post.author?.username },
          preview: post.content.substring(0, 120) + '...',
        },
        corrector: correction.corrector,
        corrected_preview: correction.corrected_text.substring(0, 120) + '...',
        created_at: correction.created_at,
      }));
    });

    // Sort the final flattened array by date for the dashboard
    if (type === 'all') {
      corrections.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return res.status(200).json({ data: corrections });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
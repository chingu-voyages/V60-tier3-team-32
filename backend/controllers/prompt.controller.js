import Prompt from '../models/prompt.model.js';

export const getPrompts = async (req, res) => {
  try {
    const user = req.user;

    const learningPromptFilters = (user.learning_languages ?? []).map((l) => ({
      language: l.language,
      fluency_level: l.level,
    }));

    const [learningPrompts, nativePrompts] = await Promise.all([
      learningPromptFilters.length
        ? Prompt.find({ $or: learningPromptFilters })
        : [],
      Prompt.find({
        language: user.native_language,
      }),
    ]);

    // console.log('learningPromptFilters:', learningPromptFilters);
    // console.log('learningPrompts:', learningPrompts);
    // console.log('nativePrompts:', nativePrompts);

    res.status(200).json({
      data: {
        learning: learningPrompts.map((p) => ({
          id: p._id,
          title: p.title,
          description: p.description,
          language: p.language,
          fluency_level: p.fluency_level,
          prompt_key: p.prompt_key,
          type: 'learning',
        })),
        native: nativePrompts.map((p) => ({
          id: p._id,
          title: p.title,
          description: p.description,
          language: p.language,
          fluency_level: p.fluency_level,
          prompt_key: p.prompt_key,
          type: 'native',
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPrompt = async (req, res) => {
  try {
    const prompt = await Prompt.create(req.body);
    res.status(201).json(prompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

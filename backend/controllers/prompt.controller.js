import Prompt from '../models/prompt.model.js';

export const getPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find().limit(10);
    res.status(200).json({
      data: prompts.map((prompt) => ({
        id: prompt._id,
        title: prompt.title,
        description: prompt.description,
        language: prompt.language,
        fluency_level: prompt.fluency_level,
      })),
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

import Test from '../models/testModel.js';

// Get all tests
export const getTests = async (req, res) => {
  const tests = await Test.find();
  res.status(200).json(tests);
};

// Create a new test
export const createTest = async (req, res) => {
  const { title, content } = req.body;
  const newEntry = await Test.create({ title, content });
  res.status(201).json(newEntry);
};
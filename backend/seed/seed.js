import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import Prompt from '../models/prompt.model.js';

dotenv.config();

const readJSON = (file) =>
  JSON.parse(fs.readFileSync(path.join('seed/data', file), 'utf-8'));

const usersData = readJSON('users.json');
const promptsData = readJSON('prompts.json');
const postsTemplate = readJSON('posts.json');

const getWordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

const getReadingTime = (wordCount) => Math.max(1, Math.ceil(wordCount / 200));

const seedDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.error(' Dev seed cannot run in production');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    console.log('🧹 Clearing data...');
    await User.deleteMany({});
    await Post.deleteMany({});
    await Prompt.deleteMany({});

    // Users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.insertMany(
      usersData.map((user) => ({
        ...user,
        password_hash: hashedPassword,
      })),
    );

    // Prompts
    const prompts = await Prompt.insertMany(promptsData);

    const getUser = (username) => users.find((u) => u.username === username);

    const getPrompt = (post) => {
      const matching = prompts.filter(
        (p) =>
          p.language === post.language &&
          p.fluency_level === post.fluency_level,
      );

      if (matching.length > 0) {
        return matching[Math.floor(Math.random() * matching.length)];
      }

      return prompts.find((p) => p.language === post.language) || prompts[0];
    };

    // Build posts
    const postsToInsert = postsTemplate.map((post) => {
      const user = getUser(post.username);
      const prompt = getPrompt(post);

      const wordCount = getWordCount(post.content);

      // Build corrections
      const corrections = (post.corrections || []).map((c) => {
        const corrector = getUser(c.corrector_username);

        return {
          corrector: {
            _id: corrector._id,
            username: corrector.username,
            profile_image: corrector.photo_url || '',
          },
          corrected_text: c.corrected_text,
          notes: c.notes,
          created_at: new Date(),
        };
      });

      return {
        language: post.language,
        fluency_level: post.fluency_level,
        content: post.content,

        author: {
          _id: user._id,
          username: user.username,
          profile_image: user.photo_url || '',
        },

        prompt: {
          _id: prompt._id,
          title: prompt.title,
          description: prompt.description,
          language: prompt.language,
        },

        word_count: wordCount,
        reading_time: getReadingTime(wordCount),

        corrections,
        corrections_count: corrections.length,

        status: corrections.length > 0 ? 'corrected' : 'submitted',
      };
    });

    const posts = await Post.insertMany(postsToInsert);

    console.log('Seed complete!');
    console.log(`Users: ${users.length}`);
    console.log(`Prompts: ${prompts.length}`);
    console.log(`Posts: ${posts.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();

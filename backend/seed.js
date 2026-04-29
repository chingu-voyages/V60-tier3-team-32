import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import User from './models/user.model.js';
import Post from './models/post.model.js';

dotenv.config();

const usersData = [
  {
    username: 'maria_es',
    email: 'maria@example.com',
    native_language: 'spa',
    learning_languages: [{ language: 'eng', level: 'Intermediate' }],
    credits: 0,
  },
  {
    username: 'john_en',
    email: 'john@example.com',
    native_language: 'eng',
    learning_languages: [{ language: 'spa', level: 'Beginner' }],
    credits: 0,
  },
  {
    username: 'luc_fr',
    email: 'luc@example.com',
    native_language: 'fra',
    learning_languages: [
      { language: 'eng', level: 'Advanced' },
      { language: 'spa', level: 'Intermediate' },
    ],
    credits: 0,
  },
];

const prompts = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'My Morning Routine',
    description: 'Describe what you do every morning.',
    language: 'eng',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'The Emancipacion of Mimi',
    description: 'Describe in great detail.',
    language: 'eng',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Mi rutina diaria',
    description: 'Describe lo que haces cada día.',
    language: 'spa',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Une journée typique',
    description: 'Décris ta journée habituelle.',
    language: 'spa',
  },
];

const postsByUser = {
  john_en: [
    {
      language: 'spa',
      fluency_level: 'Beginner',
      content:
        'Hola, yo gusto aprender español porque es muy interesante y divertido. Yo practico todos los dias pero es dificil para mi hablar rapido y entender cuando las personas habla mucho.',
    },
    {
      language: 'spa',
      fluency_level: 'Beginner',
      content:
        'Ayer yo voy a la tienda y compro comida para mi familia. Yo no recuerdo todas las palabras en español pero intento usar frases simples para comunicar.',
    },
    {
      language: 'spa',
      fluency_level: 'Beginner',
      content:
        'Mi rutina diaria es muy simple. Yo despierto a las ocho y yo comer desayuno antes de ir a trabajo. Despues yo estudiar español por una hora en mi casa.',
    },
  ],
  maria_es: [
    {
      language: 'eng',
      fluency_level: 'Intermediate',
      content:
        'I have been learning English for a while and I can understand most of conversations, but sometimes I still struggle to express my ideas clearly. I try to practice every day by reading and speaking with other people online.',
    },
    {
      language: 'eng',
      fluency_level: 'Intermediate',
      content:
        'Last weekend I went to a restaurant with my friends and we ordered a lot of food. Everything was very delicious and we had a good time, but I forget to bring my wallet so my friend paid for me.',
    },
    {
      language: 'eng',
      fluency_level: 'Intermediate',
      content:
        'Every day I try to spend at least thirty minutes studying English. I usually read articles or listen to podcasts, and sometimes I practice speaking by recording myself and listening to my pronunciation.',
    },
  ],
  luc_fr: [
    {
      language: 'eng',
      fluency_level: 'Advanced',
      content:
        'I have been practicing English consistently because I want to work abroad in the future. Every day, I try to improve my vocabulary, listening, and speaking skills by reading articles, watching videos, and having conversations with others. Although it is sometimes challenging, I feel more confident each week and I am motivated to keep improving until I can communicate fluently in a professional environment.',
    },
    {
      language: 'eng',
      fluency_level: 'Advanced',
      content:
        'Learning English has become an important part of my daily routine because I know it will open many opportunities for my career. I often listen to podcasts during my commute and take notes on new expressions that I can use later. Even though I still make mistakes, I try to focus on progress instead of perfection and remind myself that consistency is more important than speed.',
    },
    {
      language: 'eng',
      fluency_level: 'Advanced',
      content:
        'One of my main goals is to feel completely comfortable speaking English in professional settings such as meetings, presentations, and interviews. To achieve this, I practice by recording myself speaking on different topics and reviewing my pronunciation and grammar. Over time, I have noticed significant improvement, which encourages me to keep pushing forward despite occasional frustration.',
    },
  ],
};

const getWordCount = (text) => text.trim().split(/\s+/).length;

const getReadingTime = (wordCount) => Math.max(1, Math.ceil(wordCount / 200));

const seedDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.error('Dev seed cannot run in production.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Post.deleteMany({});

    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.insertMany(
      usersData.map((user) => ({
        ...user,
        password_hash: hashedPassword,
      })),
    );

    const getUser = (username) =>
      users.find((user) => user.username === username);

    const postsToInsert = [];

    users.forEach((user) => {
      const userPosts = postsByUser[user.username] || [];

      userPosts.forEach((post, index) => {
        const wordCount = getWordCount(post.content);

        postsToInsert.push({
          language: post.language,
          fluency_level: post.fluency_level,
          prompt: prompts[index % prompts.length],
          content: post.content,
          word_count: wordCount,
          reading_time: getReadingTime(wordCount),
          corrections_count: 0,
          corrections: [],
          status: 'submitted',
          author: {
            _id: user._id,
            username: user.username,
            profile_image: user.photo_url,
          },
          created_at: new Date(),
          updated_at: new Date(),
        });
      });
    });

    const posts = await Post.insertMany(postsToInsert);

    const johnSpanishPost = posts.find(
      (post) =>
        post.author.username === 'john_en' && post.content.includes('yo gusto'),
    );

    const mariaEnglishPost = posts.find(
      (post) =>
        post.author.username === 'maria_es' &&
        post.content.includes('most of conversations'),
    );

    if (!johnSpanishPost) {
      throw new Error('johnSpanishPost not found');
    }

    if (!mariaEnglishPost) {
      throw new Error('mariaEnglishPost not found');
    }

    const john = getUser('john_en');
    const maria = getUser('maria_es');
    const luc = getUser('luc_fr');

    johnSpanishPost.corrections.push({
      _id: new mongoose.Types.ObjectId(),
      corrector: {
        _id: maria._id,
        username: maria.username,
        profile_image: maria.photo_url,
      },
      corrected_text:
        'Hola, me gusta aprender español porque es muy interesante y divertido. Yo practico todos los días pero es difícil para mí hablar rápido y entender cuando las personas hablan mucho.',
      notes:
        "Use 'me gusta' instead of 'yo gusto'. Also check accents like días, difícil, mí, and rápido.",
      created_at: new Date(),
    });
    johnSpanishPost.corrections_count = johnSpanishPost.corrections.length;
    await johnSpanishPost.save();

    mariaEnglishPost.corrections.push(
      {
        _id: new mongoose.Types.ObjectId(),
        corrector: {
          _id: john._id,
          username: john.username,
          profile_image: john.photo_url,
        },
        corrected_text:
          'I have been learning English for a while and I can understand most conversations, but sometimes I still struggle to express my ideas clearly. I try to practice every day by reading and speaking with other people online.',
        notes: "Use 'most conversations' instead of 'most of conversations'.",
        created_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        corrector: {
          _id: luc._id,
          username: luc.username,
          profile_image: luc.photo_url,
        },
        corrected_text:
          'I have been learning English for a while and I can understand most conversations, but sometimes I still struggle to express my ideas clearly. I practice every day by reading and speaking with others online.',
        notes:
          "This version is a little more natural and concise: 'speaking with others online' instead of 'speaking with other people online'.",
        created_at: new Date(),
      },
    );

    mariaEnglishPost.corrections_count = mariaEnglishPost.corrections.length;

    await mariaEnglishPost.save();

    console.log('Seed complete!');
    console.log(`Users created: ${users.length}`);
    console.log(`Posts created: ${posts.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();

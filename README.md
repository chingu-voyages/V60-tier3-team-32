# LinguaLoop

A collaborative language learning web app where learners improve their writing through crowd-sourced corrections and feedback from native and advanced speakers.

# Live Demo

{TODO}

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [User Flow](#user-flow)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Our Team](#our-team)

## Overview

LinguaLoop connects language learners with native and advanced speakers. Users write journal entries, short essays, sentences, in their target language, and the community provides inline corrections and commentary. Think of it as a peer-review system for language learning.

## Features

**Post in your target language** — submit writing for community review
**Community corrections** — native/advanced speakers annotate and correct text
**Skill-level tagging** — posts and users are tagged by proficiency level (Beginner, Intermediate, Advance, Native)
**Language based system** — content is organized by language pairs (e.g., EN → ES, JP → EN) for more relevant corrections.
**Prompts and Guidance** - daily or suggested prompts to help users start writing
**User profiles** — track languages spoken, corrections given, and posts made

## User Flow

1. User signs up and selects native + learning languages
2. User creates a post in their target language
3. Other users provide corrections and feedback
4. User reviews corrections and improves

## Tech Stack

| **Layer**    | **Technology**                       |
| ------------ | ------------------------------------ |
| **Frontend** | React + Vite                         |
| **Styling**  | Tailwind CSS, ShadCn                 |
| **Backend**  | Node.js + Express                    |
| **Database** | MongoDB                              |
| **Auth**     | JWT                                  |
| **Hosting**  | Vercel (frontend) + Render (backend) |

## Getting Started

#### 1. Clone the repo

```bash
git clone

https://github.com/your-org/lingualoop.git

cd lingualoop
```

#### 2. Install dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

#### 3. Set up environment variables

```bash
cp .env.example .env
```

**Fill in your values (see Environment Variables below)**

**Backend (/backend/.env)**

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend (/frontend/.env)**

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 4. Set up the database

- Make sure MongoDB is running locally or use a hosted database like MongoDB Atlas
- Backend must be running before testing authentication
- Ensure all environment variables are correctly set

### 5. Start the development server

```bash
npm run dev
```

## Contributing

Create a feature branch from `dev`

```bash
git checkout -b feature/your-feature-name
```

Make your changes
Open a Pull Request against `dev`

## Our Team

- Noman Sajid: [GitHub](https://github.com/noman-sajid) / [LinkedIn](https://www.linkedin.com/in/noman-sajid01/)
- Rasitraka: [GitHub](https://github.com/rasitraka0) / [LinkedIn](https://www.linkedin.com/in/sitraka-heritina-andriambarijao-209597238/)
- Amanda Acolatse: [GitHub](https://github.com/ae-aco) / [LinkedIn](https://linkedin.com/in/amandaacolatse)
- Jazz Bullecer: [GitHub](https://github.com/jazxbx) / [LinkedIn](https://www.linkedin.com/in/jazz-bullecer-89780928a)
- Tonia Montgomery: [GitHub](https://github.com/MontgomeryT7294) / [LinkedIn](http://www.linkedin.com/in/tonia-montgomery)
- Margaret Wu: [GitHub](https://github.com/margaretcwu) / [LinkedIn](https://www.linkedin.com/in/margaretcwu/)

```

```

## Local Setup

1. Clone the repo
2. Navigate to backend folder: `cd backend`
3. Install dependencies: `npm install`
4. Copy the example env file: `cp .env.example .env`
5. Fill in your `.env` values
6. Start MongoDB:
   - **Docker**: `docker start mongodb`
   - **Local**: Make sure MongoDB is running on port 27017
7. Seed the database: `npm run seed`
8. Run the server: `npm run dev`

## API Endpoints

### Auth

#### Register

**POST** `/api/v1/auth/register`

Request body:

```json
{
  "username": "john_en",
  "email": "john@example.com",
  "password": "password123",
  "native_language": "eng",
  "learning_languages": [
    {
      "language": "spa",
      "level": "Beginner"
    }
  ]
}
```

#### Login

**POST** `/api/v1/auth/login`

Request body:

```json
{
  "identifier": "john@example.com",
  "password": "password123"
}
```

`identifier` can be either email or username.

---

### Prompts

#### Get Prompts

**GET** `/api/v1/prompts/today`

---

### Posts

> `GET /api/v1/posts` and `GET /api/v1/posts/:id` are public endpoints (no auth required)
> All other post endpoints require `Authorization: Bearer <access_token>` header

#### Create Post

**POST** `/api/v1/posts`

Request body:

```json
{
  "prompt_id": "<prompt_id>",
  "language": "spa",
  "fluency_level": "Beginner",
  "content": "Hola, estoy aprendiendo español.",
  "status": "draft"
}
```

#### Get All Posts

**GET** `/api/v1/posts`

Query params: `?page=1&limit=10&status=submitted&correctable=true`

#### Get Post by ID

**GET** `/api/v1/posts/:id`

#### Update Post

**PATCH** `/api/v1/posts/:id`

Request body:

```json
{
  "content": "Mon post modifié",
  "status": "submitted"
}
```

#### Delete Post

**DELETE** `/api/v1/posts/:id`

#### Submit Post

**POST** `/api/v1/posts/:id/submit`

#### Submit Correction

**POST** `/api/v1/posts/:id/corrections`

Request body:

```json
{
  "corrected_text": "Hola, me gusta aprender español.",
  "notes": "Use 'me gusta' instead of 'yo gusto'"
}
```

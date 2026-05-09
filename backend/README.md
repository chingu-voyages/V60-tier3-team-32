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

BASE URL: `/api/v1`

## Language Codes

Use ISO 639-3 codes for all language fields. (e.g. `eng`, `fra`, `spa`)

---

### Auth

#### Register

**POST** `/api/v1/auth/register`

Request body:

```json
{
  "username": "maria_es",
  "email": "maria@example.com",
  "password": "password123",
  "native_language": "spa",
  "learning_languages": [{ "language": "eng", "level": "Intermediate" }]
}
```

#### Login

**POST** `/api/v1/auth/login`

Request body:

```json
{
  "identifier": "maria@example.com",
  "password": "password123"
}
```

`identifier` can be either email or username.

#### Refresh Token

**POST** `/api/v1/auth/refresh`

No request body. Uses `refresh_token` cookie.

#### Logout

**POST** `/api/v1/auth/logout`

No request body.

---

### Prompts

#### Get Prompts

**GET** `/api/v1/prompts/today`

No auth required.

---

### Posts

> `GET /api/v1/posts` and `GET /api/v1/posts/:id` are public endpoints (no auth required)
> All other post endpoints require `Authorization: Bearer <access_token>` header

#### Get All Posts

**GET** `/api/v1/posts`

Query params: `?page=1&limit=10`

#### Get Corrections Queue

**GET** `/api/v1/posts?status=submitted&correctable=true`

Query params: `?status=submitted&correctable=true&page=1&limit=10`

> Returns posts the current user can correct (excludes own posts, only native language)

#### Get Post by ID

**GET** `/api/v1/posts/:id`

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

> Note: If content language doesn't match declared language, a `language_warning` will be included in the response.

#### Update Post

**PATCH** `/api/v1/posts/:id`

Request body (all fields optional):

```json
{
  "content": "Updated content here...",
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

---

### Users

> All user endpoints require `Authorization: Bearer <access_token>` header

#### Get My Profile

**GET** `/api/v1/users/me`

#### Get My Posts

**GET** `/api/v1/users/me/posts`

Query params: `?status=submitted&page=1&limit=10`

#### Update Profile

**PATCH** `/api/v1/users/me`

Request body (all fields optional):

```json
{
  "bio": "I love learning languages!",
  "photo_url": "https://example.com/photo.jpg",
  "native_language": "fra",
  "learning_languages": [
    {
      "language": "eng",
      "level": "Advanced"
    }
  ]
}
```

#### Get My Corrections

Returns all corrections made by the currently authenticated user.

**GET** `/api/v1/corrections/me`

No request body

Response

```json
{
  "data": [
    {
      "id": "665f7f5d4b1a7c0012a12345",
      "post": {
        "id": "665f7e4f4b1a7c0012a67890",
        "language": "spa",
        "prompt": {
          "title": "Mi comida favorita"
        },
        "author": {
          "username": "jazz"
        },
        "preview": "Me gusta mucho la pizza porque..."
      },
      "corrected_preview": "Me gusta mucho la pizza porque es...",
      "created_at": "2026-05-09T12:00:00.000Z"
    }
  ]
}
```

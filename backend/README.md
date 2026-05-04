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

BASE URL

```
/api/v1
```

## Language Codes

Use ISO 639-3 -letter codes for all language fields. (e.g. `eng`, `fra`, `spa`).

## General Notes

- List/feed endpoints return preview data only.
- Detail endpoints return the full post content and corrections.
- `corrections_count` is included in list responses so the FE does not need to fetch full corrections just to show a count.

### Status values

- draft
- submitted
- corrected

### Reading time

- `reading_time` is in minutes (rounded)

## **AUTH**

All endpoints return `Content-Type: application/json`. Protected routes (everything except these four) expect an `Authorization: Bearer <access_token>` header.

## REGISTER

`POST /api/v1/auth/register`

Creates a new user account, sets a refresh token cookie, and returns an access token

**Request body:**

```json
{
  "username": "maria_es",
  "email": "maria@example.com",
  "password": "plaintext_password",
  "native_language": "spa",
  "learning_languages": [{ "language": "eng", "level": "Intermediate" }]
}
```

**Response:**

```json
{
  "id": "69f21218774bb51a678b97a2",
  "username": "maria_es",
  "email": "maria@example.com",
  "native_language": "spa",
  "learning_languages": [{ "language": "eng", "level": "Intermediate" }],
  "credits": 0,
  "access_token": "<jwt>",
  "created_at": "2026-04-29T14:13:44.124Z"
}
```

Also sets an `HttpOnly` cookie: `refresh_token`.

## Login

`POST /api/v1/auth/login`

Authenticates a user by email or username. Returns a new access token and rotates the refresh token cookie.

\*\*Request body:

```json
{
  "identifier": "maria@example.com",
  "password": "plaintext_password"
}
```

`identifier` can be either an email address or a username — the server detects which based on the presence of `@`.

**Response**

```json
{
  "access_token": "<jwt>"
}
```

Also sets a new `refresh_token` cookie.

## Refresh

`POST /api/v1/auth/refresh`

Issues a new access token using the refresh token cookie. Call this when a request fails with `401` due to an expired access token.

**Request body:** none

**Cookie required:** `refresh_token` (set automatically by login/register)

**Response**

```json
"access_token": "<jwt>"
```

## Logout

`POST /api/v1/auth/logout`

Invalidates the refresh token server-side and clears the cookie. The access token remains technically valid until it expires (15 min) — the FE should discard it immediately on logout.

**Request body:** none

**Response**

```json
{ "message": "Logged out successfully" }
```

Clears the `refresh_token` cookie.

## **POSTS**

#### `GET /api/v1/posts`

No request body.

**Query params:** `?page=1&limit=10`

**Response:**

json

```json
{
  "data": [
    {
      "id": "69f21218774bb51a678b97a9",
      "language": "eng",
      "fluency_level": "Intermediate",
      "prompt": {
        "id": "69f21218774bb51a678b979e",
        "title": "My Morning Routine",
        "description": "Describe what you do every morning."
      },
      "author": {
        "id": "69f21218774bb51a678b97a2",
        "username": "maria_es",
        "photo_url": ""
      },
      "preview": "I have been learning English for a while and I can understand most of conversations...",
      "word_count": 39,
      "reading_time": 1,
      "corrections_count": 2,
      "status": "submitted",
      "created_at": "2026-04-29T14:13:44.129Z"
    },
    {
      "id": "69f21218774bb51a678b97a8",
      "language": "spa",
      "fluency_level": "Beginner",
      "prompt": {
        "id": "69f21218774bb51a678b979e",
        "title": "My Morning Routine",
        "description": "Describe what you do every morning."
      },
      "author": {
        "id": "69f21218774bb51a678b97a2",
        "username": "john_en",
        "photo_url": ""
      },
      "preview": "Hola, me gusta aprender español porque es muy interesante y divertido. Yo practico todos...",
      "word_count": 14,
      "reading_time": 1,
      "corrections_count": 2,
      "status": "submitted",
      "created_at": "2026-04-29T14:13:44.129Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "total_pages": 5
  }
}
```

Notes:

- This endpoint does not return full `content`.
- This endpoint does not return the full `corrections` array.
- Use `GET /api/v1/posts/:id` for the full post.

---

#### `GET /api/v1/posts/:id`

Returns a specific post with full content and corrections.

No request body.

**Response:**

json

```json
{
  "id": "69f21218774bb51a678b97a9",
  "language": "eng",
  "fluency_level": "Intermediate",
  "prompt": {
    "id": "69f21218774bb51a678b979e",
    "title": "My Morning Routine",
    "description": "Describe what you do every morning."
  },
  "author": {
    "id": "69f21218774bb51a678b97a2",
    "username": "maria_es",
    "photo_url": ""
  },
  "content": "I have been learning English for a while and I can understand most of conversations...",
  "word_count": 39,
  "reading_time": 1,
  "corrections_count": 2,
  "corrections": [
    {
      "id": "69f21218774bb51a678b97b4",
      "corrector": {
        "id": "69f21218774bb51a678b97a4",
        "username": "john_en",
        "photo_url": ""
      },
      "corrected_text": "I have been learning English for a while and I can understand most conversations...",
      "notes": "Use 'most conversations' instead of 'most of conversations'.",
      "created_at": "2026-04-29T14:13:44.133Z"
    }
  ],
  "status": "submitted",
  "created_at": "2026-04-29T14:13:44.129Z",
  "updated_at": "2026-04-29T14:13:44.133Z"
}
```

- `corrector` lives inside each correction.

---

#### `GET /api/v1/users/me/posts?status=corrected&limit=5`

View Recent Corrections

No request body.

**Response:**

json

```json
{
  "data": [
    {
      "id": "69f21218774bb51a678b97a9",
      "language": "eng",
      "fluency_level": "Intermediate",
      "prompt": {
        "id": "69f21218774bb51a678b979e",
        "title": "My Morning Routine",
        "description": "Describe what you do every morning."
      },
      "preview": "I have been learning English for a while...",
      "word_count": 39,
      "reading_time": 1,
      "corrections_count": 2,
      "status": "corrected",
      "created_at": "2026-04-29T14:13:44.129Z"
    }
  ]
}
```

- No pagination needed because this is a fixed dashboard preview.
- Use `limit=5`.

#### `GET /api/v1/users/me/posts?status=submitted&limit=10`

View recent submissions

No request body.

**Response:**

json

```json
{
  "data": [
    {
      "id": "69f21218774bb51a678b97aa",
      "language": "eng",
      "fluency_level": "Intermediate",
       "prompt": {
	     "id": "69f21218774bb51a678b979e",
	     "title": "My Morning Routine",
	     "description": "Describe what you do every morning."
      },
      "preview": "Last weekend I went to a restaurant with my friends...",
      "word_count": 40,
      "reading_time": 1,
      "corrections_count": 0,
      "status": "submitted",
      "created_at": "2026-04-29T14:13:44.129Z"
    },
    {
      "id": "69f21218774bb51a678b97ab",
      "language": "eng",
      "fluency_level": "Intermediate",
       "prompt": {
	     "id": "69f21218774bb51a678b979e",
	     "title": "A Person I Admire",
	     "description": "Write about someone you admire and explain why."
      },
      "preview": "Every day I try to spend at least thirty minutes...",
      "word_count": 40,
      "reading_time": 1,
      "corrections_count": 0,
      "status": "submitted",
      "created_at": "2026-04-29T14:13:44.129Z"
    }
  ]
  "page":1,
  "limit":10
}
```

- No pagination needed because this is a fixed dashboard preview.
- Use `limit=10`.

---

#### `GET /api/v1/users/me/posts`

Fetch user's submissions and drafts

also supports

```
GET /api/v1/users/me/posts?status=submitted
GET /api/v1/users/me/posts?status=draft
GET /api/v1/users/me/posts?status=corrected
```

No request body

**Query params:** `?status=submitted&page=1&limit=5`

**Response:**

json

```json
{
  "data": [
    {
      "id": "69f21218774bb51a678b97a9",
      "language": "eng",
      "fluency_level": "Intermediate",
      "prompt": {
        "id": "69f21218774bb51a678b979e",
        "title": "My Morning Routine",
        "description": "Describe what you do every morning."
      },
      "preview": "I have been learning English for a while...",
      "word_count": 39,
      "reading_time": 1,
      "corrections_count": 2,
      "status": "submitted",
      "created_at": "2026-04-29T14:13:44.129Z"
    },
    {
      "id": "69f21218774bb51a678b97ab",
      "language": "eng",
      "fluency_level": "Intermediate",
      "prompt": {
        "id": "69f21218774bb51a678b979e",
        "title": "A Person I Admire",
        "description": "Write about someone you admire and explain why."
      },
      "preview": "Every day I try to spend at least thirty minutes...",
      "word_count": 40,
      "reading_time": 1,
      "corrections_count": 0,
      "status": "submitted",
      "created_at": "2026-04-29T14:13:44.129Z"
    }
  ],
  "page": 1,
  "limit": 5
}
```

---

#### `POST /api/v1/posts`

Creates a draft or submitted post.

- `prompt_id` is required.
- Posts cannot be created without a prompt.

**Request body:**

json

```json
{
  "prompt_id": "69f21218774bb51a678b979e",
  "language": "eng",
  "fluency_level": "Intermediate",
  "content": "I have been learning English for a while...",
  "status": "draft"
}
```

> `status` is either `"draft"` or `"submitted"`.

**Response:**

```json
{
  "id": "69f21218774bb51a678b97a9",
  "language": "eng",
  "fluency_level": "Intermediate",
  "prompt": {
    "id": "69f21218774bb51a678b979e",
    "title": "My Morning Routine",
    "description": "Describe what you do every morning."
  },
  "content": "I have been learning English for a while...",
  "word_count": 39,
  "reading_time": 1,
  "corrections_count": 0,
  "status": "draft",
  "created_at": "2026-04-29T14:13:44.129Z",
  "updated_at": "2026-04-29T14:13:44.129Z"
}
```

Notes:

- `status` is either `"draft"` or `"submitted"`.

if submitted content appears to be written in a different language than the selected language, the response may include a `language_warning`

\*\*Request body:

```json
{
  "prompt_id": "69f4f21c911319c0dcd62e35",
  "language": "eng",
  "fluency_level": "Intermediate",
  "content": "Hola como estas yo hablo español todos los dias",
  "status": "submitted"
}
```

\*\*Response:

```json
{
  "id": "69f4f21c911319c0dcd62e99",
  "language": "eng",
  "fluency_level": "Intermediate",
  "prompt": {
    "id": "69f4f21c911319c0dcd62e35",
    "title": "My Morning Routine",
    "description": "Describe what you do every morning."
  },
  "author": {
    "id": "69f4f21c911319c0dcd62e11",
    "username": "maria_es",
    "photo_url": ""
  },
  "content": "Hola como estas yo hablo español todos los dias",
  "word_count": 8,
  "reading_time": 1,
  "corrections_count": 0,
  "status": "submitted",
  "created_at": "2026-05-01T18:20:44.129Z",
  "updated_at": "2026-05-01T18:20:44.129Z",
  "language_warning": {
    "detected_language": {
      "code": "spa",
      "label": "Spanish"
    },
    "declared_language": {
      "code": "eng",
      "label": "English"
    },
    "message": "This looks like Spanish, but you selected English"
  }
}
```

Notes:

`language_warning` only appears when the backend detects a possible mismatch between the selected language and the written content.

The post is still created even if `language_warning` is returned.

Drafts may skip language warning checks depending on backend logic.

`detected_language.code` and `declared_language.code` use ISO-639-3 codes.

---

#### `PATCH /api/v1/posts/:id`

Updates a post.

**Request body** (all fields optional, only send what changed):

json

```json
{
  "content": "Updated content here...",
  "status": "submitted"
}
```

Same shape as `POST /api/v1/posts`.

Notes:

- All fields are optional.
- Only send fields that changed.

**Response**

```json
{
  "id": "69f58f79bc7ad12b9b976a8e",
  "language": "spa",
  "fluency_level": "Beginner",
  "prompt": {
    "id": "69f4f21c911319c0dcd62e39",
    "title": "Una persona que admiro",
    "description": "Escribe sobre alguien que admiras."
  },
  "content": "Hola me llamo edited this",
  "word_count": 5,
  "reading_time": 1,
  "corrections_count": 0,
  "status": "draft",
  "created_at": "2026-05-02T05:45:29.229Z",
  "updated_at": "2026-05-02T05:47:18.042Z"
}
```

---

### CORRECTIONS QUEUE

#### `GET /api/v1/posts?status=submitted&correctable=true`

Returns posts that the current user is allowed to correct.

When **correctable=true**, the API will:

Include posts with status:

- submitted
- corrected (posts can receive multiple corrections)

Exclude posts created by the current user
Only include posts in the user’s native language

No request body.

**Query params:** `?status=submitted&correctable=true&page=1&limit=10`

**Response:**

```json
{
  "data": [
    {
      "id": "69f21218774bb51a678b97ac",
      "language": "spa",
      "fluency_level": "Beginner",
      "prompt": {
        "id": "69f21218774bb51a678b979e",
        "title": "My Morning Routine",
        "description": "Describe what you do every morning."
      },
      "author": {
        "id": "69f21218774bb51a678b97a4",
        "username": "john_en",
        "photo_url": ""
      },
      "preview": "Hola, yo gusto aprender español porque es muy  interesante...",
      "word_count": 30,
      "reading_time": 1,
      "corrections_count": 0,
      "status": "submitted",
      "created_at": "2026-04-29T14:13:44.129Z"
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "total_pages": 2
  }
}
```

Notes:

Excludes the current user's own posts
Only includes posts in the user’s native language
Includes both:

- posts with no corrections (submitted)
- posts with existing corrections (corrected)

Full content is not returned in this list view. Use `GET /api/v1/posts/:id` for full content.

---

## **SUBMIT CORRECTION**

#### `POST /api/v1/posts/:id/corrections`

Submits a correction for a specific post.

Request body:

```json
{
  "corrected_text": "I have been learning English for a while and I can understand most conversations...",
  "notes": "Use 'most conversations' instead of 'most of conversations'."
}
```

Response:

```json
{
  "id": "69f21218774bb51a678b97b4",
  "post_id": "69f21218774bb51a678b97a9",
  "corrector": {
    "id": "69f21218774bb51a678b97a4",
    "username": "john_en",
    "photo_url": ""
  },
  "corrected_text": "I have been learning English for a while and I can understand most conversations...",
  "notes": "Use 'most conversations' instead of 'most of conversations'.",
  "created_at": "2026-04-29T14:13:44.133Z"
}
```

Notes:

- `corrected_text` is required.
- `notes` can be optional if the team wants to allow correction-only submissions.
- After a correction is created, the post’s `corrections_count` should increase.

---

#### `DELETE /api/v1/posts/:id`

Deletes a post.

---

# Prompts

Returns a curated set of prompts

For MVP, prompts will be seeded in the database.

`GET /api/v1/prompts/today`

Prompts are grouped for easier frontend rendering

- Learning prompts
  Match both:
  language
  fluency_level (based on user level)
- Native prompts
  Match native_language

No request body.

**Response**

```json
{
  "data": {
    "learning": [
      {
        "id": "69f83bd9cc6cd123446c358b",
        "title": "Mi comida favorita",
        "description": "Describe tu comida favorita y por qué te gusta.",
        "language": "spa",
        "fluency_level": "Beginner",
        "type": "learning"
      },
      {
        "id": "69f83bd9cc6cd123446c3591",
        "title": "Une personne que j’admire",
        "description": "Parle de quelqu’un que tu admires.",
        "language": "fra",
        "fluency_level": "Intermediate",
        "type": "learning"
      }
    ],
    "native": [
      {
        "id": "69f83bd9cc6cd123446c3586",
        "title": "My Favorite Food",
        "description": "Describe your favorite food and why you like it.",
        "language": "eng",
        "fluency_level": "Beginner",
        "type": "native"
      }
    ]
  }
}
```

- For MVP, prompts are seeded in the database.
  -Endpoint may return a small rotating set (implementation flexible)
  -Order is not guaranteed — frontend should control display
  -Learning prompts should be prioritized in UI

---

## **PROFILE**

#### `GET /api/v1/users/me`

Returns the logged-in user's profile.

No Request Body

**Response:**

```json
{
  "id": "69f21218774bb51a678b97a2",
  "username": "maria_es",
  "email": "maria@example.com",
  "photo_url": null,
  "bio": null,
  "native_language": "spa",
  "learning_languages": [
    {
      "language": "eng",
      "level": "Intermediate"
    }
  ],

  "credits": 0,
  "created_at": "2026-04-29T14:13:44.124Z"
}
```

---

PATCH : TODO
LIKES : TODO

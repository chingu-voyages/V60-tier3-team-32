## Local Setup

1. Clone the repo
2. Navigate to backend folder: `cd backend`
3. Install dependencies: `npm install`
4. Copy the example env file: `cp .env.example .env`
5. Fill in your `.env` values
6. Start MongoDB:
   - **Docker**: `docker start mongodb`
   - **Local**: Make sure MongoDB is running on port 27017
7. Run the server: `npm run dev`

## API Endpoints

### Auth

#### Register

**POST** `/api/v1/auth/register`

Request body:

```json
{
  "username": "HelloWorld",
  "email": "helloworld@gmail.com",
  "password": "password123",
  "native_language": "eng",
  "learning_languages": [
    {
      "language": "fra",
      "level": "Advanced"
    }
  ]
}
```

Response:

```json
{
  "id": "69f21218774bb51a678b97a2",
  "username": "HelloWorld",
  "email": "helloworld@gmail.com",
  "native_language": "eng",
  "learning_languages": [
    {
      "language": "fra",
      "level": "Advanced"
    }
  ],
  "credits": 0,
  "access_token": "eyJhbGc...",
  "created_at": "2026-04-29T14:13:44.124Z"
}
```

> Sets `refresh_token` as HttpOnly cookie (7 days).

---

#### Login

**POST** `/api/v1/auth/login`

Request body:

```json
{
  "identifier": "helloworld@gmail.com",
  "password": "password123"
}
```

`identifier` can be either email or username.

Response:

```json
{
  "access_token": "eyJhbGc..."
}
```

> Sets `refresh_token` as HttpOnly cookie (7 days).

---

#### Refresh

**POST** `/api/v1/auth/refresh`

No request body. Reads `refresh_token` from HttpOnly cookie automatically.

Response:

```json
{
  "access_token": "eyJhbGc..."
}
```

---

#### Logout

**POST** `/api/v1/auth/logout`

No request body. Reads `refresh_token` from HttpOnly cookie automatically.

Response:

```json
{
  "message": "Logged out successfully"
}
```

> Clears `refresh_token` cookie and nulls it in the database.

---

### Profile

#### Get Current User

**GET** `/api/v1/users/me`

No request body. Requires `Authorization: Bearer <access_token>` header.

Response:

```json
{
  "id": "69f21218774bb51a678b97a2",
  "username": "HelloWorld",
  "email": "helloworld@gmail.com",
  "photo_url": null,
  "bio": null,
  "native_language": "eng",
  "learning_languages": [
    {
      "language": "fra",
      "level": "Advanced"
    }
  ],
  "credits": 0,
  "created_at": "2026-04-29T14:13:44.124Z"
}
```

### Posts

> GET /posts and GET /posts/:id are public endpoints (no auth required)
> All other post endpoints require `Authorization: Bearer <access_token>` header

#### Create Post

**POST** `/api/v1/posts`

Request body:

```json
{
  "language": "fra",
  "content": "Mon premier post",
  "status": "draft"
}
```

> Note: If content language doesn't match declared language, a `language_warning` will be included in the response.

#### Get All Posts

**GET** `/api/v1/posts`

Query params: `?page=1&limit=10&language=fra`

#### Get Post by ID

**GET** `/api/v1/posts/:id`

#### Update Post

**PATCH** `/api/v1/posts/:id`

Request body:

```json
{
  "language": "fra",
  "content": "Mon post modifié"
}
```

#### Delete Post

**DELETE** `/api/v1/posts/:id`

#### Submit Post

**POST** `/api/v1/posts/:id/submit`

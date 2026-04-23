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
  "native_language": "EN",
  "learning_languages": [
    {
      "language": "FR",
      "level": "Advanced"
    }
  ]
}
```
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
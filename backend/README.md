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

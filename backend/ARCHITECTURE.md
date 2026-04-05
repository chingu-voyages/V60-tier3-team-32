# Backend Architecture

## Overview

This document outlines the current architecture and structure of the Node.js/Express backend for **LinguaLoop** - a neural data bridge application. The backend provides RESTful APIs for the React frontend to interact with MongoDB databases.

### Project Summary
- **Framework**: Express.js 5.2.1 (Node.js server framework)
- **Database**: MongoDB with Mongoose ODM
- **Module System**: ES modules
- **API Style**: RESTful with JSON responses
- **Authentication**: JWT (JWT_SECRET configured, ready for implementation)
- **API Documentation**: Available via HTTP endpoints
- **Database Synchronization**: Bridge between MongoDB Atlas and frontend

### Key Architecture Principles
1. **MVC Pattern** - Models (Mongoose), Controllers (business logic), Routes (endpoints)
2. **Middleware Pipeline** - CORS, body parsing, error handling
3. **Environment-Based Configuration** - Development/Production modes via environment variables
4. **Database Connection Management** - Connection pooling and timeout handling
5. **RESTful API Design** - Standard HTTP methods (GET, POST, PUT, DELETE)
6. **Modular Organization** - Separated concerns by directory

---

## Tech Stack

### Core Dependencies
- **Express** (^5.2.1) - Fast, unopinionated web framework for Node.js
- **Mongoose** (^9.4.1) - MongoDB object modeling with schema validation
- **MongoDB** - NoSQL database (via Mongoose connection)

### Middleware & Utilities
- **CORS** (^2.8.6) - Cross-Origin Resource Sharing for frontend origin handling
- **dotenv** (^17.4.0) - Environment variable management

### Runtime
- **Node.js** - JavaScript runtime (server-side)
- **ES Modules** - Modern JavaScript module system (not CommonJS)

---

## Project Structure

```
backend/
├── config/                          # Configuration files
│   └── db.js                       # MongoDB connection setup
├── controllers/                     # Business logic layer
│   └── testController.js           # Test feature controllers (getTests, createTest)
├── middleware/                      # Express middleware
│   └── errorMiddleware.js          # Global error handling middleware
├── models/                          # Mongoose schemas & models
│   └── testModel.js                # Test document schema
├── routes/                          # API endpoint routes
│   └── testRoutes.js               # Test feature endpoints
├── utils/                           # Utility functions (empty - ready for implementation)
├── .env                            # Environment variables (development)
├── .env.example                    # Template for environment variables
├── .gitignore                      # Git ignore rules
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Locked dependency versions
└── server.js                       # Main application entry point
```

---

## Configuration Files

### Node Environment Setup (`package.json`)
- **Type**: `"module"` - Uses ES modules instead of CommonJS
- **Main**: `server.js` - Entry point for the application
- **Start Script**: `npm start` runs `node server.js`

### Environment Variables (`.env`)
```env
# Server Configuration
PORT=5000                                    # Server listening port
NODE_ENV=development                       # Environment mode (development/production)

# Database Configuration
MONGO_URI=mongodb://127.0.0.1:27017/lingual-loop    # MongoDB connection URI

# Authentication
JWT_SECRET="thiscouldbeanythingfornow"    # JWT signing secret (for future auth)

# Frontend Configuration
FRONTEND_URL=http://localhost:5173         # Frontend URL for CORS
```

### Express Server Configuration (`server.js`)
- **CORS Setup**: Configured to accept requests from FRONTEND_URL with credentials
- **Body Parsing**: JSON and URL-encoded body support via `express.json()` and `express.urlencoded()`
- **Environment Loading**: `dotenv.config()` loads .env variables
- **Port Configuration**: Defaults to 5000 if PORT not set
- **Health Check**: GET `/` endpoint returns server status

---

## Database Architecture

### MongoDB Connection (`config/db.js`)
- **Connection String**: Reads from `MONGO_URI` environment variable
- **Mongoose Configuration**:
  - `strictQuery: false` - Allows flexible query handling
  - `serverSelectionTimeoutMS: 5000` - 5-second timeout for server selection
  - `socketTimeoutMS: 45000` - 45-second socket timeout for stability
- **Error Handling**: Process exits on connection failure
- **Logging**: Logs successful connection with MongoDB host

### Data Models (`models/`)

#### Test Model (`testModel.js`)
```javascript
testSchema {
  title: String (required),
  content: String (required),
  createdAt: Timestamp (auto),
  updatedAt: Timestamp (auto)
}
```
- Document-oriented schema using Mongoose
- Automatic timestamp fields for audit trail
- Indexed by MongoDB `_id` field automatically

---

## API Architecture

### RESTful Endpoints

#### Test Feature (`/api/test`)
- **Route File**: `routes/testRoutes.js`
- **Controller**: `controllers/testController.js`

| Method | Endpoint | Function | Response |
|--------|----------|----------|----------|
| GET    | `/api/test` | `getTests()` | Array of all test documents |
| POST   | `/api/test` | `createTest()` | Newly created test document |

### Routes & Controllers Pattern
```
testRoutes.js
  └─> GET & POST to / (root)
       ├─> GET: calls testController.getTests()
       └─> POST: calls testController.createTest()
            └─> Both use Test model for database operations
```

### Controller Layer (`controllers/testController.js`)

**getTests()**
- Fetches all documents from Test collection
- Returns: HTTP 200 with array of test objects
- Error handling: Via global errorMiddleware

**createTest()**
- Accepts: `{ title, content }` in request body
- Creates new document in Test collection
- Returns: HTTP 201 (Created) with new document
- Validation: Via Mongoose schema

---

## Request/Response Flow

### HTTP Request Flow
```
Client (Frontend)
  │
  ├─> Request: GET /api/test
  │    │
  │    └─> CORS Middleware (validates origin)
  │         │
  │         └─> Body Parser Middleware
  │              │
  │              └─> Route Handler (testRoutes.js)
  │                   │
  │                   └─> Controller (testController.js)
  │                        │
  │                        └─> Model (testModel.js)
  │                             │
  │                             └─> MongoDB Query
  │
  └─> Response: JSON array with HTTP 200
```

### Error Handling Flow
```
Error Occurs in Controller/Model
  │
  └─> Global Error Middleware (errorMiddleware.js)
       │
       ├─> Extract status code (default 500)
       ├─> Build error JSON response
       ├─> Include stack trace (development only)
       └─> Send HTTP response
```

---

## Middleware Architecture

### Request Pipeline
```
1. CORS Middleware
   └─> Validates FRONTEND_URL origin
   └─> Sets credentials headers

2. Body Parser Middleware
   ├─> express.json() - Parse JSON bodies
   └─> express.urlencoded() - Parse form data

3. Route Handler
   └─> Matches endpoint and calls controller

4. Error Handler Middleware
   └─> Catches errors and formats response
```

### Error Middleware (`middleware/errorMiddleware.js`)
- **Signature**: `errorHandler(err, req, res, next)`
- **Status Code**: Uses existing status or defaults to 500
- **Response Format**: JSON with message and optional stack trace
- **Production Safety**: Stack traces hidden in production mode
- **Environment Awareness**: `NODE_ENV` determines stack trace visibility

---

## API Response Format

### Success Response (200)
```json
[
  {
    "_id": "ObjectId",
    "title": "String",
    "content": "String",
    "createdAt": "ISO8601 Timestamp",
    "updatedAt": "ISO8601 Timestamp"
  }
]
```

### Error Response (500)
```json
{
  "message": "Error description",
  "stack": "Error stack trace (development only)"
}
```

### Created Response (201)
```json
{
  "_id": "ObjectId",
  "title": "String",
  "content": "String",
  "createdAt": "ISO8601 Timestamp",
  "updatedAt": "ISO8601 Timestamp"
}
```

---

## File Relationships & Data Flow

### Application Startup Flow
```
npm start
  │
  └─> server.js (Main entry point)
       ├─> dotenv.config() - Load .env variables
       ├─> connectDB() [config/db.js]
       │    └─> mongoose.connect(MONGO_URI)
       │         └─> MongoDB connection established
       │
       ├─> Express app initialization
       ├─> Middleware setup (CORS, body parsing)
       │
       ├─> Route registration
       │    └─> app.use('/api/test', testRoutes)
       │         └─> testRoutes registers GET & POST handlers
       │
       └─> Server listen on PORT
            └─> Console: "Server running in [mode] on port [PORT]"
```

### GET Request Flow
```
Frontend (HTTP GET /api/test)
  │
  └─> server.js (Express instance)
       │
       └─> CORS Middleware
            │
            └─> testRoutes [routes/testRoutes.js]
                 │
                 └─> router.get('/', getTests)
                      │
                      └─> testController.getTests()
                           │
                           └─> Test.find() [models/testModel.js]
                                │
                                └─> MongoDB Query
                                     │
                                     └─> Returns array of documents
                                          │
                                          └─> res.json(tests)
                                               │
                                               └─> HTTP 200 + JSON Array
```

### POST Request Flow
```
Frontend (HTTP POST /api/test with body: {title, content})
  │
  └─> server.js (Express instance)
       │
       └─> CORS Middleware
            │
            └─> Body Parser Middleware
                 │ └─> Parses JSON body
                 │
                 └─> testRoutes [routes/testRoutes.js]
                      │
                      └─> router.post('/', createTest)
                           │
                           └─> testController.createTest()
                                │
                                ├─> Destructure {title, content} from req.body
                                │
                                └─> Test.create({title, content})
                                     │
                                     └─> Mongoose validates schema
                                          │
                                          └─> MongoDB inserts document
                                               │
                                               └─> Returns new document
                                                    │
                                                    └─> res.json(newEntry)
                                                         │
                                                         └─> HTTP 201 + JSON Object
```

### Error Flow
```
Any Step in Request Pipeline Throws Error
  │
  └─> next(error) automatically called
       │
       └─> Global Error Handler [middleware/errorMiddleware.js]
            │
            ├─> Extracts or sets status code
            ├─> Formats error response
            │
            └─> res.json({message, stack?})
                 │
                 └─> HTTP [statusCode] + Error JSON
```

### Module Dependency Graph
```
server.js (entry point)
  ├─> config/db.js
  │    └─> mongoose (external)
  │         └─> MongoDB
  │
  ├─> middleware/errorMiddleware.js
  │    └─> errorHandler function
  │
  ├─> routes/testRoutes.js
  │    ├─> express.Router()
  │    └─> controllers/testController.js
  │         │
  │         └─> models/testModel.js
  │              └─> mongoose.Schema()
  │
  ├─> express (external)
  ├─> cors (external)
  └─> dotenv (external)
```

---

## Environment-Based Behavior

### Development Mode (`NODE_ENV=development`)
- Stack traces included in error responses
- All console logs visible
- Hot reload possible with nodemon
- Strict query disabled for flexibility
- Connection timeouts: 5000ms

### Production Mode (`NODE_ENV=production`)
- Stack traces hidden from API responses
- Error logging to external service (future)
- Process exit on connection failures
- Compiled/minified assets (future)
- Connection pooling optimized

---

## Scalability Considerations

### Database Optimization
- **Connection Pooling**: Mongoose manages connection pool
- **Query Optimization**: Ready for indexing on frequently queried fields
- **Timeout Management**: 45-second socket timeout prevents hanging connections

### API Scaling Options
- **Stateless Design**: Each request is independent (ready for horizontal scaling)
- **Load Balancing**: Can run multiple instances behind load balancer
- **Caching**: Ready for Redis caching layer
- **Rate Limiting**: Can be added via middleware (express-rate-limit)

### Future Improvements
- Authentication middleware for JWT validation
- Request validation layer (express-validator)
- API versioning (/api/v1/test, /api/v2/test)
- Logging middleware (morgan, winston)
- API documentation (Swagger/OpenAPI)
- Testing framework (Jest, Supertest)

---

## Implementation Status

### ✅ Completed
1. **Server Setup** (`server.js`):
   - ✅ Express app initialized with middleware
   - ✅ CORS configured with FRONTEND_URL
   - ✅ Body parsing configured (JSON & URL-encoded)
   - ✅ Health check endpoint (GET /)
   - ✅ Error handler middleware registered

2. **Database Configuration** (`config/db.js`):
   - ✅ MongoDB connection with Mongoose
   - ✅ Connection timeout configuration
   - ✅ Error handling on connection failure
   - ✅ Environment-based connection string

3. **Data Model** (`models/testModel.js`):
   - ✅ Test schema with title, content, timestamps
   - ✅ MongoDB validation via Mongoose

4. **API Routes** (`routes/testRoutes.js`):
   - ✅ GET /api/test endpoint
   - ✅ POST /api/test endpoint

5. **Controllers** (`controllers/testController.js`):
   - ✅ getTests() - Fetch all test documents
   - ✅ createTest() - Create new test document

6. **Error Handling** (`middleware/errorMiddleware.js`):
   - ✅ Global error handler with status code management
   - ✅ Environment-aware error responses

7. **Environment Setup**:
   - ✅ .env file with all required variables
   - ✅ Port, database, JWT secret configured
   - ✅ Frontend URL for CORS

### ⏳ In Progress / Planned

1. **Authentication Feature**:
   - JWT middleware for route protection
   - Login/Register endpoints
   - User model schema

2. **Practice Feature**:
   - Practice routes and controllers
   - Practice model schema
   - Learning progress tracking

3. **Validation Layer**:
   - Input validation middleware
   - Request schema validation
   - Error response standardization

4. **Logging & Monitoring**:
   - Request logging (morgan)
   - Error tracking
   - Performance monitoring

5. **Testing Framework**:
   - Unit tests for controllers
   - Integration tests for API endpoints
   - Database seeding for tests

6. **API Documentation**:
   - Swagger/OpenAPI documentation
   - API endpoint reference
   - Request/response examples

---

## Available Scripts

```bash
npm start       # Run server with node server.js
npm test        # Run tests (not configured yet)
```

### Starting the Server
```bash
npm start
# Output: Server running in development mode on port 5000
#         MongoDB Connected: 127.0.0.1
```

---

## Dependencies Version Control

All dependencies are locked in `package-lock.json` to ensure consistent installations across environments.

### Current Dependencies
- **express** (^5.2.1) - Web framework
- **mongoose** (^9.4.1) - MongoDB ODM
- **cors** (^2.8.6) - CORS middleware
- **dotenv** (^17.4.0) - Environment variables

To update dependencies:
```bash
npm update                # Updates to latest allowed versions
npm outdated            # Check for available updates
npm install [package]   # Install specific package version
```

---

## Code Quality & Standards

### Error Handling
- All errors caught by global middleware
- Graceful degradation on database failure
- Process exit prevents zombie processes

### CORS Configuration
- Origin validated against FRONTEND_URL
- Credentials supported
- Protects from unauthorized cross-origin requests

### Mongoose Configuration
- Strict query mode disabled for flexibility
- Automatic schema validation
- Connection pooling enabled

---

## Browser/Client Support

- RESTful JSON API compatible with modern HTTP clients
- CORS headers allow any compliant frontend
- JSON request/response format (no XML or other formats)

---

## Development Workflow

### Local Development
1. Ensure MongoDB is running on `localhost:27017`
2. Create `.env` file with required variables (copy from `.env` or `.env.example`)
3. Run `npm start`
4. Server runs on `http://localhost:5000`
5. Frontend calls API at `http://localhost:5000/api/...`

### Testing API Endpoints
```bash
# Test GET endpoint
curl http://localhost:5000/api/test

# Test POST endpoint
curl -X POST http://localhost:5000/api/test \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"This is a test"}'

# Test health check
curl http://localhost:5000/
```

---

## Quick Reference Guide

### Common Tasks

#### Adding a New Route
1. Create controller in `controllers/`
2. Create route file in `routes/`
3. Import and register in `server.js`: `app.use('/api/feature', featureRoutes)`

#### Adding a New Model
1. Create schema file in `models/featureModel.js`
2. Define schema with Mongoose
3. Export `mongoose.model('Feature', featureSchema)`
4. Import in controller: `import Feature from '../models/featureModel.js'`

#### Handling Errors
1. Throw error in controller
2. Global middleware catches it
3. Formatted response sent to client
4. Check `.env` NODE_ENV for stack trace visibility

### Request/Response Examples

#### GET Request
```javascript
// Frontend
const response = await fetch('http://localhost:5000/api/test');
const data = await response.json();
```

#### POST Request
```javascript
// Frontend
const response = await fetch('http://localhost:5000/api/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New', content: 'Data' })
});
const newData = await response.json();
```

### Import Pattern
```javascript
// Use ES modules
import express from 'express';
import Test from '../models/testModel.js';

// Not CommonJS
// const express = require('express');
```

---

## Future Considerations

- TypeScript migration for type safety
- GraphQL API alternative to REST
- WebSocket support for real-time updates
- Message queuing (RabbitMQ/Kafka) for async operations
- Microservices architecture as app grows
- Containerization with Docker
- CI/CD pipeline setup
- Database backup and recovery strategies
- API security (rate limiting, input sanitization)
- OAuth2 or third-party authentication

---

## File Structure Quick Navigation

| File/Path | Purpose |
|-----------|---------|
| `server.js` | Express app initialization & middleware |
| `config/db.js` | MongoDB connection setup |
| `models/testModel.js` | Mongoose schema & database model |
| `routes/testRoutes.js` | API endpoint route definitions |
| `controllers/testController.js` | Business logic & data operations |
| `middleware/errorMiddleware.js` | Global error handling |
| `.env` | Local environment configuration |
| `package.json` | Project metadata & dependencies |

---

## Troubleshooting

### MongoDB Connection Issues
- Verify `mongodb://127.0.0.1:27017` is accessible
- Check MONGO_URI in `.env`
- Ensure MongoDB service is running
- Check connection timeout (5000ms) not too short

### CORS Errors
- Verify FRONTEND_URL in `.env` matches frontend origin
- Check browser console for specific error
- Ensure credentials: true is set if needed

### Port Already in Use
- Change PORT in `.env`
- Kill process using port 5000: `lsof -ti:5000 | xargs kill -9`

### Body Parser Errors
- Verify Content-Type header is application/json
- Check request body is valid JSON
- Ensure body size doesn't exceed limits

---

## Performance Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Server Start Time | < 2s | Depends on MongoDB connection |
| GET /api/test | < 100ms | Typical with < 1000 documents |
| POST /api/test | < 200ms | Includes database write |
| CORS Check | < 10ms | Pre-flight request overhead |

---

## Security Considerations

### Current Implementation
- CORS origin validation
- Environment variables for sensitive data
- Error stack traces hidden in production

### Future Enhancements
- Request validation to prevent injection
- Rate limiting to prevent abuse
- JWT authentication for protected routes
- HTTPS enforcement in production
- SQL injection prevention (not applicable with Mongoose)
- Input sanitization for XSS prevention

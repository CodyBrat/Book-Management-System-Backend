# Book Management System Backend

A robust REST API for managing books, built with Node.js, Express, and adhering to strict OOP principles (Controller -> Service -> Repository).

## Features

- **CRUD Operations**: Create, Read, Update, Delete books.
- **Advanced Querying**: Search, filtering, sorting, and pagination.
- **Authentication**: Simple API Key based authentication.
- **Clean Architecture**: Separation of concerns using OOP.
- **Error Handling**: Centralized error management.

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Server**
    ```bash
    npm start      # Production
    npm run dev    # Development
    ```

## API Documentation

### Authentication
Include the header `x-api-key: secret-token` for `POST`, `PUT`, `DELETE` requests. `GET` requests are public.

### Endpoints

#### 1. Get All Books
**GET** `/api/books`

**Query Parameters:**
- `search`: Search by title or author (e.g., `?search=Orwell`)
- `genre`: Filter by genre (e.g., `?genre=Classic`)
- `sort`: Sort by field (e.g., `?sort=price:asc` or `?sort=price:desc`)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

#### 2. Get Single Book
**GET** `/api/books/:id`

#### 3. Create Book
**POST** `/api/books`
**Headers**: `x-api-key: secret-token`
**Body**:
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre",
  "price": 19.99,
  "publishYear": 2024
}
```

#### 4. Update Book
**PUT** `/api/books/:id`
**Headers**: `x-api-key: secret-token`
**Body**: (Partial updates allowed)

#### 5. Delete Book
**DELETE** `/api/books/:id`
**Headers**: `x-api-key: secret-token`

## Architecture
- **Models**: Data definitions.
- **Repositories**: Data access layer (In-memory storage for this demo).
- **Services**: Business logic and validation.
- **Controllers**: HTTP request/response handling.

## Project Structure

```
src/
├── app.js              # Express app setup
├── server.js           # Entry point
├── controllers/        # Request Handlers
│   └── BookController.js
├── services/           # Business Logic
│   └── BookService.js
├── repositories/       # Data Access
│   └── BookRepository.js
├── models/             # Data Models
│   └── Book.js
├── routes/             # API Routes
│   └── bookRoutes.js
└── middlewares/        # Middlewares (Auth, Error)
    └── index.js
```
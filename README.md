# Backend Redsky Coding Challenge

## Project Structure

```
backend-redsky-coding-challenge/
│── src/
│   ├── application/        # Business logic (use cases)
│   │   ├── use-cases/
│   │   │   ├── createUser.ts
│   │   │   ├── getUsers.ts
│   │   │   ├── updateUser.ts
│   │   │   ├── deleteUser.ts
│   │   │   ├── fetchInitialUsers.ts
│   ├── domain/             # Domain entities and repositories
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   ├── repositories/
│   │   │   ├── UserRepository.ts
│   ├── infrastructure/     # Implementation details
│   │   ├── repositories/
│   │   │   ├── InMemoryUserRepository.ts
│   │   ├── services/
│   │   │   ├── ReqResUserService.ts
│   ├── presentation/       # Controllers and routes
│   │   ├── controllers/
│   │   │   ├── UserController.ts
│   │   ├── routes/
│   │   │   ├── userRoutes.ts
│   ├── config/             # Server configuration
│   │   ├── server.ts
│   ├── main.ts             # Application entry point
│── tests/                  # Unit and integration tests
│── package.json
│── tsconfig.json
│── README.md
```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/sotopro/backend-redsky-coding-challenge.git
   cd backend-redsky-coding-challenge
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project

### Development Mode

```sh
npm run dev
```

### Build the Project

```sh
npm run build
```

### Run in Production Mode

```sh
npm run start
```

### Lint the Code

```sh
npm run lint
```

### Format the Code

```sh
npm run format
```

### Run Tests

```sh
npm run test
```

## API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/users     | Get all users     |
| POST   | /api/users     | Create a new user |
| PUT    | /api/users/:id | Update a user     |
| DELETE | /api/users/:id | Delete a user     |

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=3000
```

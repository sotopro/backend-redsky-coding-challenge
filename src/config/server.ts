import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { FetchInitialUsers } from '../application/use-cases/fetchInitialUsers';
import { InMemoryUserRepository } from '../infrastructure/repositories/InMemoryUserRepository';
import userRoutes from '../presentation/routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const userRepository = new InMemoryUserRepository();

const fetchInitialUsers = new FetchInitialUsers(userRepository);
fetchInitialUsers
  .execute()
  .then(() => {
    app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    );

    app.use(express.json());

    app.use('/api', userRoutes(userRepository));

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to fetch initial users:', error);
  });

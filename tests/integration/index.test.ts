import express from 'express';
import request from 'supertest';
import { FetchInitialUsers } from '../../src/application/use-cases/fetchInitialUsers';
import { InMemoryUserRepository } from '../../src/infrastructure/repositories/InMemoryUserRepository';
import userRoutes from '../../src/presentation/routes/userRoutes';

const app = express();
app.use(express.json());

describe('User API Integration Tests', () => {
  let userId: number;
  let userRepository: InMemoryUserRepository;

  beforeAll(async () => {
    userRepository = new InMemoryUserRepository();
    const fetchInitialUsers = new FetchInitialUsers(userRepository);
    await fetchInitialUsers.execute();
    app.use('/api', userRoutes(userRepository));
  });

  it('should fetch all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  }, 5000);

  it('should create a new user', async () => {
    const newUser = {
      avatar: 'https://example.com/avatar.png',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  }, 5000);

  it('should update an existing user', async () => {
    expect(userId).toBeDefined();

    const updatedUser = { firstName: 'Jane' };
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Jane');
  }, 5000);

  it('should delete an existing user', async () => {
    expect(userId).toBeDefined();

    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
    const getResponse = await request(app).get(`/api/users/${userId}`);
    expect(getResponse.status).toBe(404);
  }, 5000);
});

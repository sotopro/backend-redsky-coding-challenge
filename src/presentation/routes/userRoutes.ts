import { Router } from 'express';
import { CreateUser } from '../../application/use-cases/createUser';
import { DeleteUser } from '../../application/use-cases/deleteUser';
import { GetUsers } from '../../application/use-cases/getUsers';
import { UpdateUser } from '../../application/use-cases/updateUser';
import { InMemoryUserRepository } from '../../infrastructure/repositories/InMemoryUserRepository';
import { UserController } from '../controllers/userController';

export default function userRoutes(userRepository: InMemoryUserRepository) {
  const router = Router();

  const userController = new UserController(
    new CreateUser(userRepository),
    new GetUsers(userRepository),
    new UpdateUser(userRepository),
    new DeleteUser(userRepository)
  );

  router.get('/users', (req, res) => userController.getAllUsers(req, res));
  router.post('/users', (req, res) => userController.createNewUser(req, res));
  router.put('/users/:id', (req, res) =>
    userController.updateExistingUser(req, res)
  );
  router.delete('/users/:id', (req, res) =>
    userController.deleteExistingUser(req, res)
  );

  return router;
}

import { CreateUser } from '../../src/application/use-cases/createUser';
import { DeleteUser } from '../../src/application/use-cases/deleteUser';
import { GetUsers } from '../../src/application/use-cases/getUsers';
import { UpdateUser } from '../../src/application/use-cases/updateUser';
import { InMemoryUserRepository } from '../../src/infrastructure/repositories/InMemoryUserRepository';

let userRepository: InMemoryUserRepository;
let createUser: CreateUser;
let getUsers: GetUsers;
let updateUser: UpdateUser;
let deleteUser: DeleteUser;

beforeEach(() => {
  userRepository = new InMemoryUserRepository();
  createUser = new CreateUser(userRepository);
  getUsers = new GetUsers(userRepository);
  updateUser = new UpdateUser(userRepository);
  deleteUser = new DeleteUser(userRepository);
});

describe('User Use Cases Unit Tests', () => {
  it('should create a user', async () => {
    const user = await createUser.execute({
      avatar: 'https://example.com/avatar.png',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });

    expect(user).toHaveProperty('id');
    expect(user.firstName).toBe('John');
  });

  it('should get all users', async () => {
    await createUser.execute({
      avatar: 'https://example.com/avatar.png',
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
    });

    const users = await getUsers.execute();
    expect(users.length).toBe(1);
  });

  it('should update a user', async () => {
    const user = await createUser.execute({
      avatar: 'https://example.com/avatar.png',
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
    });

    const updatedUser = await updateUser.execute(user.id, {
      firstName: 'Robert',
    });
    expect(updatedUser.firstName).toBe('Robert');
  });

  it('should delete a user', async () => {
    const user = await createUser.execute({
      avatar: 'https://example.com/avatar.png',
      firstName: 'Charlie',
      lastName: 'Davis',
      email: 'charlie.davis@example.com',
    });

    await deleteUser.execute(user.id);
    const users = await getUsers.execute();
    expect(users.length).toBe(0);
  });
});

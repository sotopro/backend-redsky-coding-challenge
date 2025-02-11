import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      id: Date.now(),
      ...userData,
    };

    await this.userRepository.create(newUser);
    return newUser;
  }
}

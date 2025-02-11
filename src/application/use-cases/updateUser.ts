import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = { ...user, ...userData };
    await this.userRepository.update(userId, updatedUser);
    return updatedUser;
  }
}

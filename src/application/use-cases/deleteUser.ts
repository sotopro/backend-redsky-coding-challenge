import { UserRepository } from '../../domain/repositories/UserRepository';

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(userId);
  }
}

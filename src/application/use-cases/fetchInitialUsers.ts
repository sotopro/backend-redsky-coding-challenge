import axios from 'axios';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { ReqResUser } from '../../infrastructure/services/ReqResUserService';
export class FetchInitialUsers {
  private readonly USERS_API = 'https://reqres.in/api/users?page=1';

  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<void> {
    try {
      const response = await axios.get(this.USERS_API);
      const users: User[] = response.data.data.map((user: ReqResUser) => ({
        id: user.id,
        avatar: user.avatar,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      }));

      for (const user of users) {
        await this.userRepository.create(user);
      }
    } catch (error) {
      console.error('Error fetching initial users:', error);
      throw new Error('Failed to fetch initial users');
    }
  }
}

import axios from 'axios';
import { User } from '../../domain/entities/User';

export interface ReqResUser {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class ReqResUserService {
  private readonly USERS_API = 'https://reqres.in/api/users';

  async fetchUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${this.USERS_API}?page=1`);
      return response.data.data.map((user: ReqResUser) => ({
        id: user.id,
        avatar: user.avatar,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      }));
    } catch (error) {
      console.error('Error fetching users from ReqRes API:', error);
      throw new Error('Failed to fetch users from ReqRes API');
    }
  }
}

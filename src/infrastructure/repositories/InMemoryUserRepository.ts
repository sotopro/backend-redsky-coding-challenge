import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async update(id: number, updatedUser: User): Promise<void> {
    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user
    );
  }

  async delete(id: number): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

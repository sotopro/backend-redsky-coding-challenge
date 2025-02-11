import { User } from '../entities/User';

export interface UserRepository {
  getAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<void>;
  update(id: number, user: User): Promise<void>;
  delete(id: number): Promise<void>;
}

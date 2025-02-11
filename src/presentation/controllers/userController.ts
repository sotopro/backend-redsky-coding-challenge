import { Request, Response } from 'express';
import { CreateUser } from '../../application/use-cases/createUser';
import { DeleteUser } from '../../application/use-cases/deleteUser';
import { GetUsers } from '../../application/use-cases/getUsers';
import { UpdateUser } from '../../application/use-cases/updateUser';

export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUsers: GetUsers,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser
  ) {}

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.getUsers.execute();
      return res.json(users);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: errMsg });
    }
  }

  async createNewUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.createUser.execute(req.body);
      return res.status(201).json(user);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      return res.status(400).json({ error: errMsg });
    }
  }

  async updateExistingUser(req: Request, res: Response): Promise<Response> {
    try {
      const updatedUser = await this.updateUser.execute(
        Number(req.params.id),
        req.body
      );
      return res.json(updatedUser);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      return res.status(404).json({ error: errMsg });
    }
  }

  async deleteExistingUser(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteUser.execute(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      return res.status(404).json({ error: errMsg });
    }
  }
}

import * as express from 'express';
import * as argon2 from 'argon2';
import { userService } from '../services';

class UserController {
  private static instance: UserController;

  static getInstance(): UserController {
    if (!UserController.instance)
      UserController.instance = new UserController();
    return UserController.instance;
  }

  async listUsers(req: express.Request, res: express.Response) {
    const users = await userService.list(100, 0);
    res.status(200).send(users);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await userService.create(req.body);
    res.status(201).send({ id: userId });
  }
}

export default UserController.getInstance();

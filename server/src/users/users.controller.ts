import express from 'express';
import argon2 from 'argon2';
import UsersService from './users.service';

class UsersController {
  private static instance: UsersController;

  static getInstance(): UsersController {
    if (!UsersController.instance)
      UsersController.instance = new UsersController();
    return UsersController.instance;
  }

  async listUsers(req: express.Request, res: express.Response) {
    const users = await UsersService.list(100, 0);
    res.status(200).send(users);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await UsersService.create(req.body);
    res.status(201).send({ id: userId });
  }
}

export default UsersController.getInstance();

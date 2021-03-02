import express from 'express';
import usersService from './users.service';

class UsersMiddleware {
  private static instance: UsersMiddleware;

  static getInstance(): UsersMiddleware {
    if (!UsersMiddleware.instance)
      UsersMiddleware.instance = new UsersMiddleware();
    return UsersMiddleware.instance;
  }

  async validateRequiredFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.username && req.body.email && req.body.password)
      next();
    else
      res
        .status(400)
        .send({ error: 'Missing field username, email or password' });
  }

  async validateEmailExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (await usersService.getUserByEmail(req.body.email))
      res
        .status(400)
        .send({
          error: `A user with email '${req.body.email}' already exists`,
        });
    else next();
  }
}

export default UsersMiddleware.getInstance();

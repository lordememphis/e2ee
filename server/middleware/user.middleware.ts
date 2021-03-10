import express from 'express';
import { userService } from '../services';

class UserMiddleware {
  private static instance: UserMiddleware;

  static getInstance(): UserMiddleware {
    if (!UserMiddleware.instance)
      UserMiddleware.instance = new UserMiddleware();
    return UserMiddleware.instance;
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
    if (await userService.getUserByEmail(req.body.email))
      res.status(400).send({
        error: `A user with email '${req.body.email}' already exists`,
      });
    else next();
  }
}

export default UserMiddleware.getInstance();

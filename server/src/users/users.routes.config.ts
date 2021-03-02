import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './users.controller';
import UsersMiddleware from './users.middleware';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/users')
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredFields,
        UsersMiddleware.validateEmailExists,
        UsersController.createUser
      );
    this.app.route('/users/:userId').get().post();
    return this.app;
  }
}

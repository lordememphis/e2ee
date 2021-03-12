import * as express from 'express';
import RoutesConfig from '.';
import { userController } from '../controllers';
import { userMiddleware } from '../middleware';

export class UserRoutes extends RoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/users')
      .get(userController.listUsers)
      .post(
        userMiddleware.validateRequiredFields,
        userMiddleware.validateEmailExists,
        userController.createUser
      );
    this.app.route('/users/:userId').get().post();
    return this.app;
  }
}

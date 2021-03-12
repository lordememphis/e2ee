import * as express from 'express';
import RoutesConfig from '.';
import { chatController } from '../controllers';

export class ChatRoutes extends RoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ChatsRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/chats')
      .get(chatController.getChats)
      .post(chatController.createChat);
    this.app.route('/chats/:chatId/messages').get().post();
    return this.app;
  }
}

import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import chatsController from './chat.controller';

export class ChatsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ChatsRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/chats')
      .get(chatsController.getChats)
      .post(chatsController.createChat);
    this.app.route('/chats/:chatId/messages').get().post();
    return this.app;
  }
}

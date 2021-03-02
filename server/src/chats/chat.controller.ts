import express from 'express';
import ChatsService from './chats.service';

class ChatController {
  private static instance: ChatController;

  static getInstance(): ChatController {
    if (!ChatController.instance)
      ChatController.instance = new ChatController();
    return ChatController.instance;
  }

  async getChats(req: express.Request, res: express.Response) {
    const chats = await ChatsService.list(100, 0);
    res.status(200).send(chats);
  }

  async createChat(req: express.Request, res: express.Response) {
    const id = await ChatsService.create(req.body.users);
    res.status(200).send({ id: id });
  }
}

export default ChatController.getInstance();

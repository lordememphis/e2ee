import { CRUD } from '../common';
import { chatDao } from '../daos';
import { ChatModel } from '../models';

class ChatService implements CRUD {
  private static instance: ChatService;

  static getInstance(): ChatService {
    if (!ChatService.instance) ChatService.instance = new ChatService();
    return ChatService.instance;
  }

  async list(limit: number, page: number): Promise<ChatModel[]> {
    return await chatDao.getChats();
  }

  async create(resource: any): Promise<string> {
    return await chatDao.createChat(resource);
  }
}

export default ChatService.getInstance();

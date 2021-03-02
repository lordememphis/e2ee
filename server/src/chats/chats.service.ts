import { CRUD } from '../common/interfaces';
import chatsDao from './chats.dao';
import { ChatModel } from './models';

class ChatsService implements CRUD {
  private static instance: ChatsService;

  static getInstance(): ChatsService {
    if (!ChatsService.instance) ChatsService.instance = new ChatsService();
    return ChatsService.instance;
  }

  async list(limit: number, page: number): Promise<ChatModel[]> {
    return await chatsDao.getChats();
  }

  async create(resource: any): Promise<string> {
    return await chatsDao.createChat(resource);
  }
}

export default ChatsService.getInstance();

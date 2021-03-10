import debug from 'debug';
import { dbService } from '../services';
import { ChatModel, UserModel } from '../models';

const log: debug.IDebugger = debug('app:chats-dao');

class ChatDao {
  private static instance: ChatDao;

  schema = new dbService.db.Schema(
    {
      userRx: Object,
      userTx: Object,
    },
    { versionKey: false }
  );

  Chat = dbService.db.model<ChatModel>('Chat', this.schema);

  static getInstance(): ChatDao {
    if (!ChatDao.instance) ChatDao.instance = new ChatDao();
    return ChatDao.instance;
  }

  constructor() {
    log('Created an instance of ChatsDao');
  }

  async getChats(): Promise<ChatModel[]> {
    return this.Chat.find().exec();
  }

  async createChat(users: UserModel[]): Promise<string> {
    const chat = await new this.Chat({ userRx: users[0], userTx: users[1] })
      .save()
      .then((doc) => doc);
    return chat._id;
  }
}

export default ChatDao.getInstance();

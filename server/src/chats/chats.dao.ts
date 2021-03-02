import debug from 'debug';
import dbService from '../common/services/db.service';
import { UserModel } from '../users/models';
import { ChatModel } from './models';

const log: debug.IDebugger = debug('app:chats-dao');

class ChatsDao {
  private static instance: ChatsDao;

  schema = new dbService.db.Schema(
    {
      userRx: Object,
      userTx: Object,
    },
    { versionKey: false }
  );

  Chat = dbService.db.model<ChatModel>('Chat', this.schema);

  static getInstance(): ChatsDao {
    if (!ChatsDao.instance) ChatsDao.instance = new ChatsDao();
    return ChatsDao.instance;
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

export default ChatsDao.getInstance();

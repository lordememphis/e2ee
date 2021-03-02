import debug from 'debug';
import { CreateDto as IUser } from './dto';
import mongooseService from '../common/service/mongoose.service';

const log: debug.IDebugger = debug('app:dao');

class UsersDao {
  private static instance: UsersDao;

  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      username: String,
      email: { type: String, unique: true },
      password: String,
    },
    { versionKey: false }
  );

  User = mongooseService.getMongoose().model<IUser>('User', this.userSchema);

  constructor() {
    log('Created new instance of UsersDao');
  }

  static getInstance(): UsersDao {
    if (!UsersDao.instance) UsersDao.instance = new UsersDao();
    return UsersDao.instance;
  }

  async addUser(user: IUser): Promise<string> {
    const doc = await new this.User({
      username: user.username,
      email: user.email,
      password: user.password,
    })
      .save()
      .then((doc: IUser) => doc);
    return doc._id;
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async getUsers(): Promise<IUser[]> {
    return this.User.find().exec();
  }
}

export default UsersDao.getInstance();

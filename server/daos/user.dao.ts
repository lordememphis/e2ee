import debug from 'debug';
import { UserModel } from '../models';
import { dbService } from '../services';

const log: debug.IDebugger = debug('app:user-dao');

class UserDao {
  private static instance: UserDao;

  Schema = dbService.db.Schema;

  userSchema = new this.Schema(
    {
      username: String,
      email: { type: String, unique: true },
      password: String,
    },
    { versionKey: false }
  );

  User = dbService.db.model<UserModel>('User', this.userSchema);

  constructor() {
    log('Created new instance of UsersDao');
  }

  static getInstance(): UserDao {
    if (!UserDao.instance) UserDao.instance = new UserDao();
    return UserDao.instance;
  }

  async addUser(user: UserModel): Promise<string> {
    const doc = await new this.User({
      username: user.username,
      email: user.email,
      password: user.password,
    })
      .save()
      .then((doc: UserModel) => doc);
    return doc._id;
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async getUsers(): Promise<UserModel[]> {
    return this.User.find().exec();
  }
}

export default UserDao.getInstance();

import { CRUD } from '../common';
import { userDao } from '../daos/';

class UserService implements CRUD {
  private static instance: UserService;

  static getInstance(): UserService {
    if (!UserService.instance) UserService.instance = new UserService();
    return UserService.instance;
  }

  async list(limit: number, page: number): Promise<any> {
    return await userDao.getUsers();
  }

  async create(resource: any): Promise<any> {
    return await userDao.addUser(resource);
  }

  async getUserByEmail(email: string) {
    return await userDao.getUserByEmail(email);
  }
}

export default UserService.getInstance();

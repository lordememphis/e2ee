import { CRUD } from '../common/interface';
import usersDao from './users.dao';

class UsersService implements CRUD {
  private static instance: UsersService;

  static getInstance(): UsersService {
    if (!UsersService.instance) UsersService.instance = new UsersService();
    return UsersService.instance;
  }

  async list(limit: number, page: number): Promise<any> {
    return await usersDao.getUsers();
  }

  async create(resource: any): Promise<any> {
    return await usersDao.addUser(resource);
  }

  async getUserByEmail(email: string) {
    return await usersDao.getUserByEmail(email);
  }
}

export default UsersService.getInstance();

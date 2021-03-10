import mongoose from 'mongoose';
import { UserModel } from './';

export interface ChatModel extends mongoose.Document {
  userRx: UserModel;
  userTx: UserModel;
}

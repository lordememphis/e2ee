import mongoose from 'mongoose';
import { UserModel } from '../../users/models';

export interface ChatModel extends mongoose.Document {
  userRx: UserModel;
  userTx: UserModel;
}

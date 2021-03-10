import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}

import mongoose from 'mongoose';

export interface CreateDto extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}
